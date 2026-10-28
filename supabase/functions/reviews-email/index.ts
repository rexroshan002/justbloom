import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  }
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors })
  try {
    const body = await req.json()
    const isError = body.company === "System"
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "JustBloom <onboarding@resend.dev>",
        to: "rexroshan002@gmail.com",
        subject: isError ? `ALERT: Reviews Failed` : `New Review: ${body.name}`,
        html: `<p><b>${body.name}</b> (${body.company}): ${body.review_text} - ${body.rating}/5</p>`,
      }),
    })
    const result = await res.json()
    return new Response(JSON.stringify({ ok: true, result }), { headers: { ...cors, "Content-Type": "application/json" } })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } })
  }
})
