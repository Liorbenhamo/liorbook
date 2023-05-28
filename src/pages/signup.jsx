import { useForm } from "react-hook-form";
import "./signup.css";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post("http://localhost:3000/users", {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
      });
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log("Error in the res");
      } else if (err.request) {
        console.log("Error in the req");
      } else {
        console.log("Error", err.message);
      }
    }
  };
  return (
    <div>
      <div id="body">
        <div className="father">
          <h1>liorbook</h1>
          <br />
          <h3>sign up:</h3>
          <form id="signupform" onSubmit={handleSubmit(onSubmit)}>
            <label>username:</label>
            <input
              placeholder="user name"
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <div>dont fit the condition:{errors.username.type}</div>
            )}
            <br />
            <br />

            <label>password:</label>
            <input
              placeholder="user password"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <div>dont fit the condition:{errors.password.type}</div>
            )}
            <br />
            <br />
            <label>first name</label>
            <input
              placeholder="first name"
              type="text"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <div>dont fit the condition:{errors.firstname.type}</div>
            )}
            <br />
            <br />
            <label>last name:</label>
            <input
              placeholder="last name"
              type="text"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <div>dont fit the condition:{errors.lastname.type}</div>
            )}
            <br />
            <br />
            <label>email:</label>
            <input
              placeholder="user email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div>dont fit the condition:{errors.email.type}</div>
            )}

            <br />
            <br />

            <input type="submit" />
            <br />
            <Link to={"/"}>
              <h6>back to login page</h6>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
