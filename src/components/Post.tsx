import { Container, Paper, Stack, Typography } from "@mui/material";
import { Post as PostModel } from "../models/Post"
import { formatDate } from "date-fns";
import Markdown from "markdown-to-jsx";
import Code from "./Code";

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
            <hr />
            <Typography>
              <Markdown options={{
                overrides: {
                  Code: {
                    component: Code
                  }
                }
              }}>{post.content}</Markdown>
            </Typography>
          </Stack>
        </Container>
      </Paper>
    </>
  )
}