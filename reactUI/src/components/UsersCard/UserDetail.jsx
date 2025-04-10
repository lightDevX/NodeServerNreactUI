import React from "react";
import { useLoaderData } from "react-router";

const UserDetail = () => {
  const loadUser = useLoaderData();
  console.log(loadUser);
  return <div>{loadUser.length}</div>;
};

export default UserDetail;
