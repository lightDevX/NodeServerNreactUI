import { Link, Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <div className="container mx-auto flex items-center justify-center gap-8 py-8">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
