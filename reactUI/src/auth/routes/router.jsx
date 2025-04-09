import { createBrowserRouter } from "react-router";
import Root from "../../components/root/Root";
import UsersCard from "../../components/UsersCard/UsersCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/users",
        element: <UsersCard></UsersCard>,
        loader: () => fetch(`http://localhost:3000/users`),
      },
    ],
  },
]);

export default router;
