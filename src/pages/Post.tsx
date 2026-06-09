import { useNavigate, useParams } from "react-router-dom";
import { default as PostComponent } from "../components/Post";
import { Post as PostModel } from "../models/Post";
import { useEffect, useState } from "react";
import { deletePost, fetchPost } from "../adapters/posts";
import Loading from "../components/Loading";
import { Alert } from "@mui/material";
import { useContext } from "../context";

export default function Post() {
  const { postId } = useParams();
  if (!postId) {
    throw new Error("fuck");
  }

  const { context } = useContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [post, setPost] = useState<PostModel | null>(null);
  const [deleting, setDeleting] = useState(false);

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
  }, [postId]);

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      const success = await deletePost(postId);
      if (!success) {
        setError("Failed to delete post.");
        setDeleting(false);
        return;
      }

      navigate("/", { replace: true });
    } catch (reason) {
      console.error(reason);
      setError("Failed to delete post.");
      setDeleting(false);
    }
  };

  if (error) {
    return <>
      <br />
      <Alert severity="error">{error}</Alert>
    </>;
  }

  if (!post) {
    return <Loading loadingText="Loading post..." />
  }

  const isOwner = context.user?.isOwner === true;

  return (
    <PostComponent
      post={post}
      onDelete={isOwner ? handleDelete : undefined}
      deleting={deleting}
    />
  );
}
