import { IAuthenticateResponse } from "./user";

type NavItem = {
  name: string;
  href: string;
};

export interface INavBarProps {
  handleDrawerToggle: () => void;
  navItems: Array<NavItem>;
  authNavItems: Array<NavItem>;
  navButtonTextColor: string;
  authData: IAuthenticateResponse | null;
}

export interface IMobileDrawerProps extends INavBarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  authData: IAuthenticateResponse | null;
}
