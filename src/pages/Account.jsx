import { useForm } from "react-hook-form";

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../App";
function Account() {
  const info = React.useContext(InfoContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log(info.correntuser._id);
      await axios.put("http://localhost:3000/put", {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
        _id: info.correntuser._id,
      });

      navigate("/");
      info.setCorrentuser();
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
      {console.log(info.correntuser)}
      <div id="body">
        <div className="father">
          <h1>liorbook</h1>
          <br />
          <h3>edit account details:</h3>
          <form id="signupform" onSubmit={handleSubmit(onSubmit)}>
            <label>username:</label>
            <input
              defaultValue={info.correntuser.username}
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
              defaultValue={info.correntuser.password}
              placeholder="user password"
              type="text"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <div>dont fit the condition:{errors.password.type}</div>
            )}
            <br />
            <br />
            <label>first name</label>
            <input
              defaultValue={info.correntuser.firstname}
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
              defaultValue={info.correntuser.lastname}
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
              defaultValue={info.correntuser.email}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
