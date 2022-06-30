import { OpenAPIBackend } from "openapi-backend";

export const handlerFunction = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: { status: "success" },
  };
};

const api = new OpenAPIBackend({
  definition: "services/functions/open-api.yml",
});

api.register({
  openapi: handlerFunction,
});

api.init().catch((err) => console.log(err));

export const handler = (event, context) => {
  api.handleRequest(
    {
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      body: event.body,
      headers: event.headers,
    },
    event,
    context
  );
};
