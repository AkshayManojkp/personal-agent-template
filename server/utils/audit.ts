import { fromNodeHeaders } from "better-auth/node";
import { auth } from "~~/auth";
import { getNodeRequest } from "~~/server/utils/h3-node";

const auditEmails = new Set(
  (process.env.INTERNAL_AUDIT_EMAILS || "")
    .split(",")
    .map(email => email.trim().toLowerCase())
    .filter(Boolean),
);

export async function getAuditSession(event: Parameters<typeof getNodeRequest>[0]) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(getNodeRequest(event).headers),
  });

  if (!session?.user?.email || !auditEmails.has(session.user.email.toLowerCase())) {
    throw createError({
      statusCode: session ? 403 : 401,
      statusMessage: session
        ? "Internal audit access is not enabled for this account."
        : "Unauthorized",
    });
  }

  return session;
}
