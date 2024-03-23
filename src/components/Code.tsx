import { Container } from "@mui/material";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useContext } from "../context";

interface CodeProps {
  // this is incorrect typing but the type stubs for react-syntax-highlighter won't take anything else
  children: string | string[];
  language: string;
}

export default function Code({ children, language }: CodeProps) {
  const { context } = useContext();

  return (
    <>
      <Container id="code">
        <SyntaxHighlighter
          language={language}
          style={context.darkMode ? oneDark : oneLight}
        >
          {children}
        </SyntaxHighlighter>
      </Container>
    </>
  )
}