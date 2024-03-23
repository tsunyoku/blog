import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useContext } from "./context";
import React from "react";

export default function Layout() {
  const { context } = useContext();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: context.darkMode ? 'dark' : 'light',
        },
      }),
    [context],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}