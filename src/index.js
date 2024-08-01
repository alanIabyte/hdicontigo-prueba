/* eslint-disable no-lonely-if */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "./recursos/estilos/estilos.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { HashRouter as Router, BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import reductor from "./reductores/index";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Cliente from "./servicios/apollo";
import GraphQLPrueba from "./demostraciones/graphql.contenedor";

/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */

const estadoPersistente = sessionStorage.getItem("estadoRedux")
  ? JSON.parse(sessionStorage.getItem("estadoRedux"))
  : {};
const deposito = createStore(reductor, estadoPersistente);

deposito.subscribe(() => {
  sessionStorage.setItem("estadoRedux", JSON.stringify(deposito.getState()));
});

const environment = process.env.REACT_APP_API_URL;

const authGraphq = {
  url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  region: process.env.REACT_APP_AWS_APPSYNC_REGION,
  auth: {
    type: process.env.REACT_APP_AWS_APPSYNC_AUTH_TYPE,
    apiKey: localStorage.getItem(`some-${environment}`),
  },
};

const urls = {
  TS: "https://1mzewyw9vb.execute-api.us-east-1.amazonaws.com/dev",
  QA: "https://1kpfni3fni.execute-api.us-east-1.amazonaws.com/qa",
  PR: "https://0877tzf447.execute-api.us-east-1.amazonaws.com/pr",
};

const obtenerSecret = async () => {
  const { data } = await axios.get(urls[environment]);
  if (data !== "") {
    authGraphq.auth.apiKey = data.body.split(":")[1].replace(/"/g, "");
    localStorage.setItem(`some-${environment}`, authGraphq.auth.apiKey);
  }
};

obtenerSecret();

const cliente = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(authGraphq),
    createSubscriptionHandshakeLink(authGraphq),
  ]),
  cache: new InMemoryCache(),
});

if (process.env.REACT_APP_BUILD === "graphql") {
  ReactDOM.render(
    <Provider store={deposito}>
      <ApolloProvider client={cliente}>
        <GraphQLPrueba />
      </ApolloProvider>
    </Provider>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <CookiesProvider>
        {/* <Router basename="/"> */}
        <Provider store={deposito}>
          <ApolloProvider client={cliente}>
            <BrowserRouter>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="de"
              >
                <App />
              </LocalizationProvider>
            </BrowserRouter>
          </ApolloProvider>
        </Provider>
        {/* </Router> */}
      </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
