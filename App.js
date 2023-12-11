import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Router from "./src/routes/Router";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { addResources } from "./i18n";

const App = () => {
  useEffect(() => {
    fetch("http://localhost:3001/localization/tr")
      .then((response) => response.json())
      .then((data) => {
        addResources(data.localizations);
      });
  }, []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
