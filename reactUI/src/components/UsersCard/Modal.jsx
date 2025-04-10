import { useEffect, useRef } from "react";

const Modal = ({ user, onClose, onUpdateSuccess }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    user ? modalRef.current?.showModal() : modalRef.current?.close();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
        }),
      });

      const data = await response.json();
      if (data.modifiedCount > 0) {
        onUpdateSuccess(); // Now properly receives the function
        onClose();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Update User</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="input input-bordered"
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
