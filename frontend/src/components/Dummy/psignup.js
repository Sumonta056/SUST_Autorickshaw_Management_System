import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="d-flex justify-content-center align-items-center">
          Sign Up Page
        </h2>
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="fw-bold fs-5 mb-2">
              Name
            </label>
            <input
              type="name"
              placeholder="Enter your name"
              className="form-control rounded-0 fst-italic"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="fw-bold fs-5 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="form-control rounded-0 fst-italic"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="fw-bold fs-5 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0 fst-italic "
            />
          </div>

          <Link to="/" className="btn btn-success w-100 mb-2" type="submit">
            SignUp
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
