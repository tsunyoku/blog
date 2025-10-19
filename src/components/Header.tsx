import { Avatar, Button, Container, IconButton, Menu, MenuItem, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Context, useContext } from "../context";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchUser, logout } from "../adapters/auth";

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

interface ProfileMenuProps {
  context: Context
  setContext: (context: Context) => void;
}

export function ProfileMenu({ context, setContext }: ProfileMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorElement(null);
  }

  const handleLogout = async () => {
    if (context.user == null) {
      return;
    }

    await logout();
    setContext({
      darkMode: context.darkMode,
      user: null,
      lastUserCheck: null,
    });
  }

  useEffect(() => {
    const checkAuth = async () => {
      if (context.user == null) {
        return;
      }

      if (context.lastUserCheck != null && Date.now() - context.lastUserCheck < TEN_MINUTES_IN_MS) {
        return;
      }

      const user = await fetchUser();

      setContext({
        darkMode: context.darkMode,
        user: user,
        lastUserCheck: user != null ? Date.now() : null,
      });
    };

    checkAuth();
  }, [context.user, context.lastUserCheck, context.darkMode, setContext]);

  return (
    <>
      <Button
        aria-label="profile-menu-button"
        id="profile-menu-button"
        aria-controls={open ? "profile-meny-button" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ textTransform: "none" }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            {context.user!.username}
          </Typography>

          <Avatar
            src={context.user!.avatarUrl}
            variant="rounded"
            sx={{ width: 36, height: 36, borderRadius: "16px" }}
          />
        </Stack>
      </Button>
      <Menu
        id="profile-menu"
        MenuListProps={{
          "aria-labelledby": "profile-menu-button",
          sx: {
            paddingTop: 0,
            paddingBottom: 0,
          }
        }}
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          '& .MuiPaper-root': {
            minWidth: anchorElement?.offsetWidth || 'auto',
            marginTop: 1,
            borderRadius: 2,
            boxShadow: 3
          }
        }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{
            justifyContent: 'center',
            py: 1.5
          }}
        >
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default function Header() {
  const { context, setContext } = useContext();

  const toggleDarkMode = () => {
    setContext({
      darkMode: !context.darkMode,
      user: context.user,
      lastUserCheck: context.lastUserCheck,
    });
  };

  return (
    <>
      <Paper elevation={1}>
        <Container>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              p: 1.25,
            }}
          >
            <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
              <Link to="/">
                <Button>
                  <Typography variant="subtitle1">tsunyoku's dev blog</Typography>
                </Button>
              </Link>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Tooltip title={context.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton onClick={toggleDarkMode}>
                  {context.darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>

              {context.user != null ? (
                <ProfileMenu context={context} setContext={setContext} />
              ) : (
                <Link to={`https://blog-api.tsunyoku.xyz/auth/login?redirectUri=${window.location.href}`}>
                  <Button variant="contained">
                    <Typography variant="subtitle1">Login</Typography>
                  </Button>
                </Link>
              )}
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </>
  )
}