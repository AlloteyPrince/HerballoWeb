export default defineEventHandler(async (event) => {
  try {
    const user = await requireAdmin(event);
    return { isAdmin: true, email: user.email };
  } catch {
    return { isAdmin: false };
  }
});
