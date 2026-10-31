module.exports = function (request, response) {
  if (request.method !== "GET") {
    response.status(405).setHeader("Allow", "GET").send("Method not allowed");
    return;
  }

  var number = String(process.env.WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(number)) {
    response.status(503).send("WhatsApp is not configured");
    return;
  }

  var text = typeof request.query.text === "string" ? request.query.text.slice(0, 4000) : "";
  response.redirect(302, "https://wa.me/" + number + "?text=" + encodeURIComponent(text));
};
