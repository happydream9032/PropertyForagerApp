export const validRoutes = [
  "/",
  "/about",
  "/contact",
  "/properties",
  "/property/[propertyId]",
  "/signup",
  "/login",
  "/[username]",
  "/backoffice",
  "/backoffice/properties",
  "/backoffice/properties/add",
];

export const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/properties",
  "/property/[propertyId]",
  "/signup",
  "/login",
];

export const getAuthorizedRedirectPath = (targetPathname: string) => {
  const redirectUrl = validRoutes.find((route) => route === targetPathname);
  return redirectUrl;
};
