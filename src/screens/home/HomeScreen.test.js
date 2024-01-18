import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";

const store = configureStore();

test("HomeScreen renders correctly", () => {
  const { getByText } = render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );

  expect(getByText("Search")).toBeTruthy();
  expect(getByText("Banners Title")).toBeTruthy();
  expect(getByText("Show More")).toBeTruthy();
});
