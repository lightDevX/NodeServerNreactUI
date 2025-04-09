import { useLoaderData, useRevalidator } from "react-router";

const UsersCard = () => {
  const users = useLoaderData();
  console.log(users);
  const revalidator = useRevalidator();

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    console.log(email, name);

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add user");
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        revalidator.revalidate(); // Refresh the loader data
        form.reset(); // Clear form inputs
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleDeleteUser = (_id) => {
    console.log("ID", _id);
    fetch(`http://localhost:3000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add user");
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        revalidator.revalidate(); // Refresh the loader data
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
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
          <li key={user._id}>
            {user.name} - {user.email} -
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default UsersCard;
