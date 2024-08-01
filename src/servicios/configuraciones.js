export default {
  appsync: {
    url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT,
    region: process.env.REACT_APP_AWS_APPSYNC_REGION,
    auth: {
      type: process.env.REACT_APP_AWS_APPSYNC_AUTH_TYPE,
      apiKey: "",
    },
  },
  api: process.env.REACT_APP_AWS_API,
};
