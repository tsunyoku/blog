import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ContextProvider } from "./context";
import Layout from "./Layout";
import Home from "./pages/Home";
import Post from "./pages/Post";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="posts/:postId" element={<Post />} />
    </Route>
  )
);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
