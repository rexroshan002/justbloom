import assert from "node:assert/strict";
import test from "node:test";
import { onRequestPost } from "../functions/api/submit.js";

const validSubmission = {
  name: "Avery Bloom",
  email: "avery@example.com",
  countryCode: "+91",
  phone: "9876543210",
  message: "I'd like to discuss a project.",
};

const createRequest = (body, headers = {}) =>
  new Request("https://justbloom.com.co/api/submit", {
    method: "POST",
    headers: {
      Origin: "https://justbloom.com.co",
      "Content-Type": "application/json",
      ...headers,
    },
    body,
  });

const postSubmission = (submission = validSubmission, headers) =>
  onRequestPost({
    request: createRequest(JSON.stringify(submission), headers),
    env: { RESEND_API_KEY: "test-api-key" },
  });

test("sends a validated submission to the team and sets the lead as reply-to", async (t) => {
  let sentEmail;
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    sentEmail = JSON.parse(options.body);
    return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
  });

  const response = await postSubmission();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(sentEmail.from, "Just Bloom Website <hello@bardapureproduction.com>");
  assert.deepEqual(sentEmail.to, ["justbloom.team@gmail.com"]);
  assert.equal(sentEmail.reply_to, validSubmission.email);
  assert.match(sentEmail.text, /Phone: \+91 9876543210/);
});

test("escapes user-provided HTML in the email body", async (t) => {
  let sentEmail;
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    sentEmail = JSON.parse(options.body);
    return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
  });

  const response = await postSubmission({
    ...validSubmission,
    name: "<img src=x>",
    message: "<script>alert(1)</script>",
  });

  assert.equal(response.status, 200);
  assert.match(sentEmail.html, /&lt;img src=x&gt;/);
  assert.match(sentEmail.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("rejects invalid data before calling Resend", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  const response = await postSubmission({ ...validSubmission, email: "invalid" });

  assert.equal(response.status, 400);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("rejects line breaks in names before they can enter the email subject", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  const response = await postSubmission({
    ...validSubmission,
    name: "Avery\nInjected subject",
  });

  assert.equal(response.status, 400);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("rejects requests from unapproved origins", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  const response = await onRequestPost({
    request: createRequest(JSON.stringify(validSubmission), {
      Origin: "https://attacker.example",
    }),
    env: { RESEND_API_KEY: "test-api-key" },
  });

  assert.equal(response.status, 403);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("accepts requests from the Cloudflare Pages production origin", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    new Response(JSON.stringify({ id: "email-id" }), { status: 200 }),
  );
  const response = await onRequestPost({
    request: createRequest(JSON.stringify(validSubmission), {
      Origin: "https://justbloom.pages.dev",
    }),
    env: { RESEND_API_KEY: "test-api-key" },
  });

  assert.equal(response.status, 200);
});

test("returns a configuration error when the Resend key is missing", async (t) => {
  t.mock.method(globalThis, "fetch");
  const response = await onRequestPost({
    request: createRequest(JSON.stringify(validSubmission)),
    env: {},
  });

  assert.equal(response.status, 503);
});

test("reports Resend failures instead of returning success", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    new Response(JSON.stringify({ message: "Rejected" }), { status: 403 }),
  );

  const response = await postSubmission();
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    success: false,
    error: "The message could not be delivered. Please try again.",
  });
});

test("rejects oversized requests", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");
  const response = await postSubmission(validSubmission, {
    "Content-Length": "12001",
  });

  assert.equal(response.status, 413);
  assert.equal(fetchMock.mock.callCount(), 0);
});
