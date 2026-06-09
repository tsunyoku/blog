import { Alert, Box, Button, Container, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../adapters/posts";
import { useContext } from "../context";
import MarkdownContent from "../components/MarkdownContent";

export default function CreatePost() {
  const { context } = useContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (context.user == null || !context.user.isOwner) {
      navigate("/", { replace: true });
    }
  }, [context.user, navigate]);

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") {
      setError("Title and content are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const postId = await createPost(title.trim(), content);
      if (postId === null) {
        setError("Failed to create post.");
        setSubmitting(false);
        return;
      }

      navigate(`/posts/${postId}`);
    } catch (reason) {
      console.error(reason);
      setError("Failed to create post.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <br />
      <Paper elevation={1} sx={{ p: 1.25 }}>
        <Container>
          <Stack direction="column" spacing={2} sx={{ p: 1.25 }}>
            <Typography variant="h5">Create a new post</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
            />

            <Tabs value={tab} onChange={(_, value) => setTab(value)}>
              <Tab label="Write" />
              <Tab label="Preview" />
            </Tabs>

            {tab === 0 ? (
              <TextField
                label="Content (Markdown)"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                multiline
                minRows={16}
                fullWidth
                InputProps={{ sx: { fontFamily: "monospace" } }}
              />
            ) : (
              <Box sx={{ minHeight: 360, p: 1 }}>
                {content.trim() === "" ? (
                  <Typography variant="body2" color="text.secondary">
                    Nothing to preview yet.
                  </Typography>
                ) : (
                  <Typography component="div">
                    <MarkdownContent>{content}</MarkdownContent>
                  </Typography>
                )}
              </Box>
            )}

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button onClick={() => navigate("/")} disabled={submitting}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Publishing..." : "Publish"}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </>
  );
}
