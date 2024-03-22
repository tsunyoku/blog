import { Container } from "@mui/material";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  // this is incorrect typing but the type stubs for react-syntax-highlighter won't take anything else
  children: string | string[];
  language: string;
}

export default function Code({ children, language }: CodeProps) {
  return (
    <>
      <Container id="code">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
        >
          {children}
        </SyntaxHighlighter>
      </Container>
    </>
  )
}