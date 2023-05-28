import React, { useContext, useEffect, useState } from "react";
import "./loginpage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { InfoContext } from "../App";
export const LoginPage = () => {
  const navigate = useNavigate();

  const info = useContext(InfoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    return info.userdata.map((item) => {
      if (item.username === data.username && item.password === data.password) {
        console.log(item);
        info.setCorrentuser(item);
        // navigate("/homepage");
      }
    });
  };
  useEffect(() => {
    const test = async () => {
      try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        console.log(data);
        info.setUserdata(data);
      } catch (err) {
        console.log(err);
      }
    };
    test();
  }, []);
  return (
    <div id="body">
      <div className="father">
        <h1>liorbook</h1>
        <br />
        <h3>login:</h3>
        <form id="loginform" onSubmit={handleSubmit(onSubmit)}>
          <label>username:</label>
          <input
            placeholder="user name"
            type="text"
            {...register("username", { required: true })}
          />
          <br />

          <label>password:</label>
          <input
            placeholder="user password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.username && <div>username is required</div>}
          {errors.password && <div>password is required</div>}
          <br />

          <input type="submit" />
          <br />
          <Link to={"/signup"}>
            <h6>you have not sign up yet click here</h6>
          </Link>
        </form>
      </div>
    </div>
  );
};
