import React, { useState } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import Login from "./Login";

const Register = () => {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {

    axiosInstance
      .post(`user/register/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        history.push("/login");
        console.log(res);
        console.log(res.data);
        history.push({
          pathname: "/",
        });
        window.location.reload();
      });
  };
  return (
    <div
      className="modal fade"
      id="exampleModalCenterr"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="ml-10" id="exampleModalLongTitle">
              Register Here
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body h-100 "
            style={{ backgroundColor: "#000" }}
          >
            <div className="col-md-12 col-md-offset-3 my-5">
              <form className="my-3">
                <div className="form-group">
                  <label style={{ color: "white" }}>Email address</label>
                  <input
                    type="email"
                    className="form-control border border-info"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "white" }}>User Name</label>
                  <input
                    type="text"
                    className="form-control border border-info"
                    name="username"
                    placeholder="Enter Username"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: "white" }}>Password</label>
                  <input
                    type="password"
                    className="form-control border border-info"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btnn" onClick={handleSubmit}>
                  Submit
                  <Login/>
                </button>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              style={{ backgroundColor: "#000" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
