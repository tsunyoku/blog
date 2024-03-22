import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
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
          </Stack>
        </Container>
      </Paper>
    </>
  )
}