import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import Modal from "./Modal";

const UsersCard = () => {
  const users = useLoaderData();
  const revalidator = useRevalidator();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add user");
        return res.json();
      })
      .then(() => {
        revalidator.revalidate();
        form.reset();
      })
      .catch(console.error);
  };

  const handleDeleteUser = (_id) => {
    fetch(`http://localhost:3000/users/${_id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        return res.json();
      })
      .then(() => revalidator.revalidate())
      .catch(console.error);
  };

  const handleUpdateSuccess = () => {
    revalidator.revalidate();
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto mt-2.5">
      <h1 className="text-2xl font-semibold text-red-400">
        Phone data comes from the server {users.length}
      </h1>

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="my-3.5 rounded-4xl px-3 py-1.5 outline outline-amber-200"
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="my-3.5 rounded-4xl px-3 py-1.5 outline outline-amber-200"
        />
        <br />
        <input
          type="submit"
          value="Submit"
          className="my-3.5 rounded-4xl px-3 py-1.5 outline outline-amber-200"
        />
      </form>

      <div>
        {users.map((user) => (
          <div key={user._id} className="flex items-center gap-5">
            <div>
              {user.name} - {user.email}
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => handleDeleteUser(user._id)}>X</button>
              <button className="btn" onClick={() => setSelectedUser(user)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <Modal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default UsersCard;
