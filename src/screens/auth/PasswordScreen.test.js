// __tests__/PasswordScreen.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { rest } from "msw";
import { setupServer } from "msw/node";
import PasswordScreen from "./PasswordScreen";
import { handlers } from "../../mocks/handlers";

// MSW server'ını başlat
const server = setupServer(...handlers);

// Testlerin başlangıcında ve bitiminde server'ı başlatıp durdurun
beforeAll(() => server.listen());
afterAll(() => server.close());

// Her test öncesinde mock'ları sıfırla
beforeEach(() => server.resetHandlers());

test("PasswordScreen renders correctly", () => {
  // Render PasswordScreen
  const { getByText, getByPlaceholderText } = render(
    <PasswordScreen route={{ params: { email: "test@example.com" } }} />
  );

  // Önemli öğeleri kontrol et
  expect(getByText("Parolanız")).toBeTruthy();
  expect(
    getByText("Parolanızı girerek Hopi dünyasına adım atabilirsiniz")
  ).toBeTruthy();
  expect(getByPlaceholderText("Parolanızı girin")).toBeTruthy();
  expect(getByText("DEVAM")).toBeTruthy();
});

test("PasswordScreen TextInput value updates correctly", () => {
  const { getByPlaceholderText } = render(
    <PasswordScreen route={{ params: { email: "test@example.com" } }} />
  );

  const passwordInput = getByPlaceholderText("Parolanızı girin");

  fireEvent.changeText(passwordInput, "testpassword");

  expect(passwordInput.props.value).toBe("testpassword");
});

test("PasswordScreen onPress event works correctly", () => {
  server.use(
    rest.post("http://localhost:3001/your-auth-endpoint", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ success: true }));
    })
  );

  const { getByText, getByPlaceholderText } = render(
    <PasswordScreen route={{ params: { email: "test@example.com" } }} />
  );

  fireEvent.changeText(
    getByPlaceholderText("Parolanızı girin"),
    "testpassword"
  );

  fireEvent.press(getByText("DEVAM"));

  expect(
    server.handlers.some(
      (handler) =>
        handler.pattern.method === "POST" &&
        handler.pattern.url.pathname === "/your-auth-endpoint"
    )
  ).toBeTruthy();
});
