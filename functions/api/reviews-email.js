const MAX_BODY_BYTES = 8_000;
const ALLOWED_ORIGINS = new Set([
  "https://justbloom.com.co",
  "https://www.justbloom.com.co",
  "https://justbloom.pages.dev",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
]);

const jsonResponse = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const isText = (value, maxLength) =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  value.trim().length <= maxLength;

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse({ success: false, error: "Origin not allowed." }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ success: false, error: "Expected a JSON request." }, 415);
  }

  const declaredLength = Number(request.headers.get("Content-Length"));
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ success: false, error: "Request is too large." }, 413);
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ success: false, error: "Invalid request body." }, 400);
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ success: false, error: "Request is too large." }, 413);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON." }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ success: false, error: "Invalid review submission." }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const reviewText =
    typeof body.review_text === "string" ? body.review_text.trim() : "";
  const rating = Number(body.rating);

  if (
    !isText(name, 120) ||
    company.length > 160 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    !isText(reviewText, 2_000)
  ) {
    return jsonResponse({ success: false, error: "Please provide a valid review." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    console.error("Review notification is unavailable: RESEND_API_KEY is not configured.");
    return jsonResponse(
      { success: false, error: "The email service is not configured." },
      503,
    );
  }

  const escaped = {
    name: escapeHtml(name),
    company: escapeHtml(company || "Not provided"),
    reviewText: escapeHtml(reviewText).replace(/\n/g, "<br>"),
  };

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "hello@justbloom.com.co",
        to: "justbloom.team@gmail.com",
        subject: `New Review: ${name} - ${rating} stars`,
        html: [
          "<h2>New Review</h2>",
          `<p><b>Name:</b> ${escaped.name}</p>`,
          `<p><b>Company:</b> ${escaped.company}</p>`,
          `<p><b>Rating:</b> ${rating}</p>`,
          `<p><b>Review:</b> ${escaped.reviewText}</p>`,
        ].join(""),
      }),
    });

    if (!resendResponse.ok) {
      console.error(`Resend rejected a review notification (HTTP ${resendResponse.status}).`);
      return jsonResponse(
        { success: false, error: "The notification could not be delivered." },
        502,
      );
    }

    const data = await resendResponse.json();
    return jsonResponse({ success: true, data }, 200);
  } catch {
    console.error("Resend request failed while processing a review notification.");
    return jsonResponse(
      { success: false, error: "The notification could not be delivered." },
      502,
    );
  }
}
