export const getPostAuthRedirectPath = (roles: string[] | null | undefined): string => {
  const normalizedRoles = Array.isArray(roles) ? roles : [];

  if (normalizedRoles.includes("ROLE_ADMIN")) return "/admin";
  if (normalizedRoles.includes("ROLE_SELLER")) return "/seller";
  return "/home";
};
