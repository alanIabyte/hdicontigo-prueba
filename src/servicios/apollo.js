import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import Configuraciones from "./configuraciones";

const cliente = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(Configuraciones.appsync),
    createSubscriptionHandshakeLink(Configuraciones.appsync),
  ]),
  cache: new InMemoryCache(),
});

export default cliente;
