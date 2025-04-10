const Modal = ({ user }) => {
  console.log(user);
  return (
    <>
      <dialog id="user_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Update your information</p>
          <div className="modal-action items-center justify-center">
            <form method="dialog w-full ">
              <fieldset>
                <label className="fieldset-label my-1.5">Email</label>
                <input
                  type="email"
                  className="input my-1.5"
                  placeholder="Email"
                />
                <label className="fieldset-label my-1.5">Password</label>
                <input
                  type="password"
                  className="input my-1.5"
                  placeholder="Password"
                />
                <button className="btn btn-neutral mt-4">Update</button>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
