import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { createClient } from "@supabase/supabase-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");
const clientReviewsPath = resolve(
  root,
  "src/components/ClientReviews.jsx",
);
const expectedSupabaseUrl = "https://lgznrajdgibwfmioiej.supabase.co";
const edgeFunctionUrl = `${expectedSupabaseUrl}/functions/v1/reviews-email`;

const readDotEnv = () => {
  let contents;
  try {
    contents = readFileSync(envPath, "utf8");
  } catch {
    return {};
  }

  return Object.fromEntries(
    contents.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) return [];

      const value = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
      return [[match[1], value]];
    }),
  );
};

const env = readDotEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY || env.ANON_KEY;

const createAnonClient = () => {
  assert.ok(
    supabaseUrl && anonKey,
    "Missing VITE_SUPABASE_URL or anon key in .env.",
  );
  return createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};

const withFix = async (fix, operation) => {
  try {
    await operation();
  } catch (error) {
    const networkCode = error?.cause?.code || error?.code;
    const errorDetails = [
      error?.message,
      error?.cause?.message,
      error?.actual?.message,
      error?.actual?.details,
      error?.details,
    ].join(" ");
    if (
      ["ENOTFOUND", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT"].includes(
        networkCode,
      ) ||
      /ENOTFOUND|ECONNREFUSED|ECONNRESET|ETIMEDOUT/.test(errorDetails)
    ) {
      console.error(
        `FIX: Network access to Supabase failed (${networkCode}). Restore DNS/network access to ${expectedSupabaseUrl}, then rerun this test.`,
      );
    } else {
      console.error(`FIX: ${fix}`);
    }
    throw error;
  }
};

test("1. .env contains the Supabase URL and anon key", async () =>
  withFix(
    "Add VITE_SUPABASE_URL=https://lgznrajdgibwfmioiej.supabase.co and VITE_SUPABASE_ANON_KEY=<your Supabase anon key> to the repository-root .env file. Never use a service-role key in the browser.",
    () => {
      assert.equal(supabaseUrl, expectedSupabaseUrl);
      assert.ok(anonKey, "The anon key is empty or missing.");

      if (anonKey.startsWith("eyJ")) {
        const claims = JSON.parse(
          Buffer.from(anonKey.split(".")[1], "base64url").toString("utf8"),
        );
        assert.equal(
          claims.role,
          "anon",
          "Configured Supabase key is not an anon-role JWT.",
        );
      } else {
        assert.match(
          anonKey,
          /^sb_publishable_/,
          "Configured key is neither an anon JWT nor a publishable key.",
        );
      }
    },
  ));

test(
  "2. Anon Supabase client can select approved reviews",
  { timeout: 30_000 },
  async () =>
    withFix(
      "Check the Supabase URL and anon key in .env, then verify the reviews table exists and is reachable.",
      async () => {
        const { data, error } = await createAnonClient()
          .from("reviews")
          .select("*")
          .eq("approved", true);
        assert.ifError(error);
        assert.ok(Array.isArray(data), "Supabase did not return review rows.");
      },
    ),
);

test(
  "3. Supabase RLS allows anon SELECT on approved reviews",
  { timeout: 30_000 },
  async () =>
    withFix(
      "In Supabase SQL Editor, enable RLS on public.reviews and add a SELECT policy for anon/authenticated users with USING (approved = true).",
      async () => {
        const { error } = await createAnonClient()
          .from("reviews")
          .select("id")
          .eq("approved", true)
          .limit(1);
        assert.ifError(error);
      },
    ),
);

test(
  "4. Supabase RLS allows anon INSERT and DELETE of a dummy review",
  { timeout: 30_000 },
  async () => {
    const fix =
      "In Supabase SQL Editor, add an INSERT policy on public.reviews for anon with WITH CHECK (approved = false), and a DELETE policy for anon limited to approved = false so this E2E test can clean up its own dummy row.";
    await withFix(fix, async () => {
      const client = createAnonClient();
      const marker = `reviews-e2e-${Date.now()}-${randomUUID()}`;
      const review = {
        name: marker,
        company: "Automated E2E test",
        rating: 5,
        review_text: "Temporary review row created by the E2E policy test.",
        approved: false,
      };

      const { data: inserted, error: insertError } = await client
        .from("reviews")
        .insert(review)
        .select("id")
        .single();

      assert.ifError(insertError);
      assert.ok(inserted?.id, "Supabase did not return the inserted review id.");

      try {
        const { data: deleted, error: deleteError } = await client
          .from("reviews")
          .delete()
          .eq("id", inserted.id)
          .select("id");
        assert.ifError(deleteError);
        assert.equal(
          deleted?.length,
          1,
          "The test review was not deleted; a DELETE RLS policy may be missing.",
        );
      } finally {
        const { error: cleanupError } = await client
          .from("reviews")
          .delete()
          .eq("id", inserted.id);
        if (cleanupError) {
          console.error(
            "FIX: The dummy review row could not be cleaned up with the anon key. Remove the test row manually from public.reviews, or configure the test database with a narrowly scoped DELETE policy for unapproved rows.",
          );
        }
      }
    });
  },
);

test(
  "5. Supabase reviews-email Edge Function is deployed and responds 200",
  { timeout: 30_000 },
  async () =>
    withFix(
      "Deploy the reviews-email Edge Function to project lgznrajdgibwfmioiej and verify its function secrets/configuration. Check the function logs for non-200 responses.",
      async () => {
        assert.ok(anonKey, "The Supabase anon key is missing from .env.");
        const response = await fetch(edgeFunctionUrl, {
          method: "POST",
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "E2E endpoint health check",
            company: "Automated test",
            rating: 5,
            review_text: "Temporary test notification; no customer data.",
          }),
          signal: AbortSignal.timeout(25_000),
        });

        assert.equal(
          response.status,
          200,
          `Edge Function returned HTTP ${response.status}.`,
        );
      },
    ),
);

test("6. ClientReviews.jsx defines FALLBACK_REVIEWS", async () =>
  withFix(
    "Define and use a FALLBACK_REVIEWS array in src/components/ClientReviews.jsx for the approved local fallback reviews.",
    () => {
      const source = readFileSync(clientReviewsPath, "utf8");
      assert.match(source, /\b(?:const|let|var)\s+FALLBACK_REVIEWS\b/);
    },
  ));

test("7. ClientReviews.jsx does not use the removed unavailable message", async () =>
  withFix(
    'Remove the string "Live reviews are temporarily unavailable" from src/components/ClientReviews.jsx and use the fallback reviews instead.',
    () => {
      const source = readFileSync(clientReviewsPath, "utf8");
      assert.doesNotMatch(source, /Live reviews are temporarily unavailable/);
    },
  ));
