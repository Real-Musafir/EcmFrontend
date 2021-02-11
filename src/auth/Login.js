import React, { useState } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push({
          pathname: "/",
        });
        window.location.reload();
      });
      // window.location.reload();
      
  };

  return (
    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="ml-10" id="exampleModalLongTitle">Login Here</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body h-100" style={{backgroundColor: "#000"}}>
      <div className="col-md-12 col-md-offset-3 my-5">
      <form>
        <div className="form-group">
          <label style={{color: "white"}} >Email address</label>
          <input
            type="email"
            className=" form-control form-control-lg border border-info"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label style={{color: "white"}}>Password</label>
          <input
            type="password"
            className="form-control form-control-lg border border-info"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btnn"
          onClick={handleSubmit}
          data-dismiss="modal"
        >
          Submit
        </button>
      </form>
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{backgroundColor: "#000"}}>Close</button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;


