type RequestEvent = Parameters<typeof getRequestHeader>[0];

export function requireInternalRequest(event: RequestEvent) {
  const secret = process.env.INTERNAL_API_SECRET?.trim();

  if (!secret) {
    throw createError({
      statusCode: 503,
      statusMessage: "Internal API is not configured",
    });
  }

  const authorization = getRequestHeader(event, "authorization");
  if (authorization !== `Bearer ${secret}`) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
}
