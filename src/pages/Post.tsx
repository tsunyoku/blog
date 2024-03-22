import { useParams } from "react-router-dom";
import { default as PostComponent } from "../components/Post";
import { Post as PostModel } from "../models/Post";
import { useEffect, useState } from "react";
import { fetchPost } from "../adapters/posts";
import Loading from "../components/Loading";
import { Alert } from "@mui/material";

export default function Post() {
  const { postId } = useParams();
  if (!postId) {
    throw new Error("fuck");
  }

  const [error, setError] = useState("");
  const [post, setPost] = useState<PostModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const post = await fetchPost(postId);
      if (post === null) {
        setError("Failed to get post from API.");
        return null;
      }

      setPost(post);
    }

    fetchData().catch((reason) => {
      setError("Failed to get post from API.");
      console.error(reason);
    });
  }, []);

  if (error) {
    return <>
      <br />
      <Alert severity="error">{error}</Alert>
    </>;
  }

  if (!post) {
    return <Loading loadingText="Loading post..." />
  }

  return <PostComponent post={post} />
}