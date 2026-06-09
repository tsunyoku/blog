import { Container, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Post as PostModel } from "../models/Post"
import { formatDate } from "date-fns";
import MarkdownContent from "./MarkdownContent";

interface PostProps {
  post: PostModel;
  onDelete?: () => void;
  deleting?: boolean;
}

export default function Post({ post, onDelete, deleting }: PostProps) {
  const handleDelete = () => {
    if (window.confirm(`"${post.title}" will be permanently deleted. This cannot be undone.`)) {
      onDelete?.();
    }
  };

  return (
    <>
      <br />
      <Paper elevation={1} sx={{ p: 1.25 }}>
        <Container>
          <Stack direction="column" sx={{
            justifyContent: "space-between",
            p: 1.25,
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h5">{post.title}</Typography>
              {onDelete && (
                <Tooltip title="Delete post">
                  <IconButton
                    aria-label="delete-post"
                    color="error"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            <Typography variant="subtitle2">
              Published {formatDate(post.publishedAt, "MMMM do yyyy, h:mm:ss a")}
            </Typography>
            <Typography component="div">
              <MarkdownContent>{post.content}</MarkdownContent>
            </Typography>
          </Stack>
        </Container>
      </Paper>
    </>
  )
}
