// src/mocks/handlers.js
const { rest } = require("msw");

const API_URL = "http://localhost";
const PORT = "3001";

const getMockBaseUrl = () => {
  return `${API_URL}:${PORT}`;
};

const api = (path) => {
  return new URL(path, `${getMockBaseUrl()}${path}`).toString();
};

const handlers = [
  rest.get(api("/your-image-endpoint"), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/hopidatabase.appspot.com/o/screen%2FHosgeldinEkrani.png?alt=media&token=c781b0ab-8b02-468d-8498-7c79e1fcd007",
      })
    );
  }),

  rest.post(api("/your-auth-endpoint"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  rest.post(api("/your-email-endpoint"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

module.exports = { handlers, PORT, API_URL, getMockBaseUrl };
