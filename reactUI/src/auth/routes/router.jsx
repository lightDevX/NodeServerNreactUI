import { createBrowserRouter } from "react-router";
import Root from "../../components/root/Root";
import Modal from "../../components/UsersCard/Modal";
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
      {
        path: "/users/:id",
        element: <Modal></Modal>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/${params.id}`),
      },
    ],
  },
]);

export default router;
