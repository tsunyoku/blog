import { Container, Link, Paper, Stack, Typography } from "@mui/material";
import { Post as PostModel } from "../models/Post";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "date-fns";
import Markdown from "markdown-to-jsx";
import Code from "./Code";

interface PostPreviewProps {
  post: PostModel;
}

export default function PostPreview({ post }: PostPreviewProps) {
  // first 20 words
  const partialContent = post.content.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <Paper>
      <Container>
        <Stack direction="column" sx={{
          justifyContent: "space-between",
          p: 1.25,
        }}>
          <Typography variant="h5">
            <Link component={RouterLink} to={`/posts/${post.id}`}>{post.title}</Link>
          </Typography>
          <Typography variant="subtitle2">
            Published {formatDate(post.publishedAt, "MMMM do yyyy, h:mm:ss a")}
          </Typography>
          <br />
          <Typography>
            <Markdown options={{
              overrides: {
                Code: {
                  component: Code
                }
              }
            }}>{partialContent}</Markdown>
          </Typography>
          <Typography variant="caption">
            <Link component={RouterLink} to={`posts/${post.id}`}>Read more...</Link>
          </Typography>
        </Stack>
      </Container>
    </Paper>
  )
}