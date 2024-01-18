import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { rest } from "msw";
import { setupServer } from "msw/node";
import EmailScreen from "./EmailScreen";
import { handlers } from "../../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

beforeEach(() => server.resetHandlers());

test("EmailScreen renders correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <EmailScreen navigation={{ navigate: jest.fn() }} />
  );

  expect(getByText("Eposta Adresi")).toBeTruthy();
  expect(getByText("Eposta adresini girerek başlayabilirsin")).toBeTruthy();
  expect(getByPlaceholderText("E-posta adresinizi girin")).toBeTruthy();
  expect(getByText("DEVAM")).toBeTruthy();
});

test("EmailScreen TextInput value updates correctly", () => {
  const { getByPlaceholderText } = render(
    <EmailScreen navigation={{ navigate: jest.fn() }} />
  );

  const emailInput = getByPlaceholderText("E-posta adresinizi girin");

  fireEvent.changeText(emailInput, "test@example.com");

  expect(emailInput.props.value).toBe("test@example.com");
});

test("EmailScreen onPress event works correctly", async () => {
  server.use(
    rest.post("http://localhost:3001/your-email-endpoint", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ success: true }));
    })
  );

  const { getByText, getByPlaceholderText } = render(
    <EmailScreen navigation={{ navigate: jest.fn() }} />
  );

  fireEvent.changeText(
    getByPlaceholderText("E-posta adresinizi girin"),
    "test@example.com"
  );

  fireEvent.press(getByText("DEVAM"));

  await waitFor(() =>
    expect(
      server.handlers.some(
        (handler) =>
          handler.pattern.method === "POST" &&
          handler.pattern.url.pathname === "/your-email-endpoint"
      )
    ).toBeTruthy()
  );
});
