import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";
import { Divider, useMediaQuery } from "@mui/material";
import Logo from "./Logo";
import { NavItem } from "@/types/navigation";

type Props = {
  navItems: Array<NavItem>;
};

const socialLinks = [
  { icon: <FacebookIcon color="info" />, link: "#" },
  { icon: <TwitterIcon color="info" />, link: "#" },
  { icon: <InstagramIcon color="error" />, link: "#" },
];

const Footer: FC<Props> = ({ navItems }) => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        py: 3,
        // px: 3,
        mb: 0,
        mt: 2,
        borderTop: "1px solid grey",
      }}
      component="footer"
    >
      <Grid
        sx={{ width: "95%" }}
        justifyContent="space-between"
        spacing={2}
        mx="auto"
        container
      >
        <Grid
          sx={{ textAlign: { xs: "center", md: "left" } }}
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Logo align={mobileView ? "center" : "left"} />
          <Typography mt={1} fontWeight={400}>
            We are here to help you find your dream home. It&apos;s our
            specialty.
            <br />
          </Typography>
        </Grid>
        <Grid
          sx={{ textAlign: { xs: "center", md: "left" } }}
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography fontWeight="bold" variant="h6" component="h6">
            Links
          </Typography>
          <Box mt={1} display="flex" flexDirection="column" gap={1}>
            {navItems.map((link, i) => (
              <Typography fontWeight={400} key={i}>
                <Link
                  style={{ textDecoration: "none", color: "#212121" }}
                  href={link.href}
                >
                  {link.name === "About"
                    ? "About Us"
                    : link.name === "Contact"
                    ? "Contact Us"
                    : link.name}
                </Link>
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid
          sx={{ textAlign: { xs: "center", md: "left" } }}
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Typography fontWeight="bold" variant="h6" component="h6">
            Address
          </Typography>
          <Typography mt={1} fontWeight={400}>
            37 Broad Street,
            <br />
            Marina, Lagos state.
          </Typography>
        </Grid>
        <Grid textAlign="center" item xs={12} md={3} sm={6}>
          <Typography fontWeight="bold" variant="h6" component="h6">
            Connect with us
          </Typography>
          <Box display="flex" justifyContent="center" gap={1}>
            {socialLinks.map((link, i) => (
              <IconButton key={i}>{link.icon}</IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, backgroundColor: "grey" }} />
      <Typography color="GrayText" textAlign="center" py={2}>
        &copy; {new Date().getFullYear()} All rights reserved, Property Forager
      </Typography>
    </Box>
  );
};

export default Footer;
