import { Container, Paper, Stack, Typography } from "@mui/material";
import { Post as PostModel } from "../models/Post"
import { formatDate } from "date-fns";
import MarkdownContent from "./MarkdownContent";

interface PostProps {
  post: PostModel;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <br />
      <Paper elevation={1} sx={{ p: 1.25 }}>
        <Container>
          <Stack direction="column" sx={{
            justifyContent: "space-between",
            p: 1.25,
          }}>
            <Typography variant="h5">{post.title}</Typography>
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