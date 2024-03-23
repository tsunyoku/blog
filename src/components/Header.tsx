import { Button, Container, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "../context";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Header() {
  const { context, setContext } = useContext();

  const toggleDarkMode = () => {
    setContext({
      darkMode: !context.darkMode,
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
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </>
  )
}