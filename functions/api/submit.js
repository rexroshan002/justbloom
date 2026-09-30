const MAX_BODY_BYTES = 12_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 5_000;
const ALLOWED_COUNTRY_CODES = new Set(["+1", "+44", "+61", "+91", "+971"]);
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

const hasControlCharacters = (value) =>
  Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });

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

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON." }, 400);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return jsonResponse({ success: false, error: "Invalid form submission." }, 400);
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const countryCode =
    typeof data.countryCode === "string" ? data.countryCode.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    !isText(name, MAX_NAME_LENGTH) ||
    hasControlCharacters(name) ||
    !isText(email, MAX_EMAIL_LENGTH) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !ALLOWED_COUNTRY_CODES.has(countryCode) ||
    !isText(phone, MAX_PHONE_LENGTH) ||
    !/^[+()\d\s.-]+$/.test(phone) ||
    !isText(message, MAX_MESSAGE_LENGTH)
  ) {
    return jsonResponse(
      { success: false, error: "Please provide valid contact details and a message." },
      400,
    );
  }

  if (!env.RESEND_API_KEY) {
    console.error("Contact form is unavailable: RESEND_API_KEY is not configured.");
    return jsonResponse(
      { success: false, error: "The contact service is not configured." },
      503,
    );
  }

  const escaped = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(`${countryCode} ${phone}`),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Just Bloom Website <hello@bardapureproduction.com>",
        to: ["justbloom.team@gmail.com"],
        reply_to: email,
        subject: `New website lead from ${name}`,
        text: [
          "New contact form submission",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${countryCode} ${phone}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        html: [
          "<h2>New contact form submission</h2>",
          `<p><strong>Name:</strong> ${escaped.name}</p>`,
          `<p><strong>Email:</strong> ${escaped.email}</p>`,
          `<p><strong>Phone:</strong> ${escaped.phone}</p>`,
          `<p><strong>Message:</strong><br>${escaped.message}</p>`,
        ].join(""),
      }),
    });

    if (!resendResponse.ok) {
      console.error(`Resend rejected a contact form submission (HTTP ${resendResponse.status}).`);
      return jsonResponse(
        { success: false, error: "The message could not be delivered. Please try again." },
        502,
      );
    }
  } catch {
    console.error("Resend request failed while processing a contact form submission.");
    return jsonResponse(
      { success: false, error: "The message could not be delivered. Please try again." },
      502,
    );
  }

  return jsonResponse({ success: true }, 200);
}
