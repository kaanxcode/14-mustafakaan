const { createServer } = require("@mswjs/http-middleware");
const { handlers, PORT, API_URL, getMockBaseUrl } = require("./handlers");

const mockServer = createServer(...handlers);

mockServer.listen(PORT, () =>
  console.log("Mock server ready at " + getMockBaseUrl())
);
