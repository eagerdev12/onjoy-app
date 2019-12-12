import React, { Component } from "react";
import { persistor, store } from "app/store";
import { StatusBar } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./navigation";
import internationalization from "./config/internationalization";
//import your ApolloProvider from react-apollo to wrap your app.
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AsyncStorage } from "react-native";

const httpLink = createHttpLink({
  uri: "https://sleepy-cove-54859.herokuapp.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AsyncStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

console.disableYellowBox = true;

export default class index extends Component {
  constructor(props) {
    super(props);

    /**
     * Define translation
     *
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    internationalization.enableFallbacks();
    internationalization.setI18nConfig();
  }

  async componentDidMount() {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  }

  render() {
    // console.log("isRTL: ", internationalization.isRTL());
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ApolloProvider>
      </Provider>
    );
  }
}
