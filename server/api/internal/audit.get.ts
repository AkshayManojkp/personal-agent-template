import { getAuditSession } from "~~/server/utils/audit";

export default defineEventHandler(async (event) => {
  const session = await getAuditSession(event);

  return {
    auditor: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
    access: "internal-audit",
  };
});
