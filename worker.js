const BOT_TOKEN = "8148507918:AAH0rINGeAeAuEiRlp7fOAcglWzg-Sp2ZIs";
const CHAT_ID = "751411829";

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return corsResponse(new Response(null, { status: 204 }));
    }

    if (request.method !== "POST") {
      return corsResponse(new Response("Method not allowed", { status: 405 }));
    }

    const data = await request.json();

    const text =
      `💌 *New Date Application!*\n\n` +
      `👤 *Name:* ${data.name || "—"}\n` +
      `📍 *Vibe:* ${data.location || "—"}\n` +
      `📅 *Date:* ${data.date || "—"}\n` +
      `⏰ *Time:* ${data.time || "—"}\n` +
      `📱 *WhatsApp:* ${data.whatsapp || "—"}\n` +
      `📸 *Instagram:* ${data.instagram || "—"}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
    });

    return corsResponse(new Response("ok", { status: 200 }));
  },
};

function corsResponse(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
