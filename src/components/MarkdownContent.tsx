import Markdown from "markdown-to-jsx";
import Code from "./Code";
import ResponsiveImage from "./ResponsiveImage";

interface MarkdownContentProps {
  children: string;
}

export default function MarkdownContent({ children }: MarkdownContentProps) {
  return (
    <Markdown options={{
      overrides: {
        Code: {
          component: Code
        },
        img: {
          component: ResponsiveImage,
        },
      }
    }}>{children}</Markdown>
  );
}
