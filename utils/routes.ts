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
  "/backoffice/properties/edit",
];

export const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/properties",
  "/property/[propertyId]",
  "/signup",
  "/login",
  "/forgot-password",
  "/passwordReset/[resetToken]",
];

export const getAuthorizedRedirectPath = (targetPathname: string) => {
  const redirectUrl = validRoutes.find((route) => route === targetPathname);
  return redirectUrl;
};
