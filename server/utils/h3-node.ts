import type { IncomingMessage, ServerResponse } from "node:http";

export type NodeRuntimeEvent = {
  node: { req: IncomingMessage; res: ServerResponse };
};

export function getNodeRequest(event: NodeRuntimeEvent) {
  return (event as NodeRuntimeEvent).node.req;
}

export function getRequestOrigin(event: NodeRuntimeEvent) {
  const req = getNodeRequest(event);
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:3000";
  const protocolHeader = req.headers["x-forwarded-proto"];
  const protocol = typeof protocolHeader === "string"
    ? protocolHeader.split(",")[0]?.trim() ?? "http"
    : "http";

  return `${protocol}://${host}`;
}
