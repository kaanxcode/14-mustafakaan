import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { rest } from "msw";
import { setupServer } from "msw/node";
import WelcomeScreen from "./WelcomeScreen";
import { handlers } from "../../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

beforeEach(() => server.resetHandlers());

test("WelcomeScreen renders image on successful fetch", async () => {
  server.use(
    rest.get("http://localhost:3001/your-image-endpoint", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/hopidatabase.appspot.com/o/screen%2FHosgeldinEkrani.png?alt=media&token=c781b0ab-8b02-468d-8498-7c79e1fcd007",
        })
      );
    })
  );

  const { getByTestId, queryByText, getByAltText } = render(<WelcomeScreen />);

  await waitFor(() => expect(getByTestId("image-test-id")).toBeTruthy());

  expect(queryByText("Loading...")).toBeNull();

  expect(getByAltText("Welcome Image")).toHaveProp(
    "source",
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/hopidatabase.appspot.com/o/screen%2FHosgeldinEkrani.png?alt=media&token=c781b0ab-8b02-468d-8498-7c79e1fcd007",
    },
    { shallow: true }
  );
});
