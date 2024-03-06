const routesAuthorization: Record<string, string[]> = {
  user: ["/user", "/"],
  admin: [
    "/admin",
    "/",
    "/admin/users",
    "/admin/providers",
    "/admin/profil",
    "/admin/statistics",
    "/admin/settings",
  ],
  provider: ["/provider", "/"],
};

export default routesAuthorization;
