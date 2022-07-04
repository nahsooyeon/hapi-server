import Hapi from "@hapi/hapi";
import { Server, Request } from "@hapi/hapi";
import { helloRoutes } from "./hello";

export let server: Server;

const index = (request: Request): string => {
  console.log("Request processing", request.info.id);
  return "Hello! Hapi Server Welcomes you.";
};

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
  });

  /* 라우팅 부분 작성 */

  server.route({ method: "GET", path: "/", handler: index });
  server.route(helloRoutes);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
