import React from "react";
import { Link } from "react-router-dom";
import "./components/login.css"

function login() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="">
          <h2 className="d-flex justify-content-center align-items-center">Sign In Page</h2>
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

          <button className="btn btn-success w-100 mb-2" type="submit">
            Login
          </button>

          <Link
            to="/signup"
            className="btn btn-default-border btn-secondary w-100"
          >
            Create an Account ?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default login;
