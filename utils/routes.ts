export const validRoutes = [
  "/",
  "/about",
  "/contact",
  "/properties",
  "/signup",
  "/login",
  "/[username]",
];

export const getAuthorizedRedirectPath = (targetPathname: string) => {
  const redirectUrl = validRoutes.find((route) => route === targetPathname);
  return redirectUrl;
};
