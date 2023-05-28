import React, { useEffect, useState } from "react";
import { InfoContext } from "../App";
import { useForm } from "react-hook-form";
import "./profile.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Posts from "../component/posts";

function Profile() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const info = React.useContext(InfoContext);
  const [changephoto, setChangephoto] = useState(false);
  const [photourl, setPhotourl] = useState();
  const filteredcom = info.allposts?.filter(
    (item) => item?.username?._id == info.correntuser._id
  );
  console.log(info.allposts);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onchange(e) {
    const imageUrl = URL.createObjectURL(e.target.value);
    setPhotourl(imageUrl);
  }
  const onSubmit2 = async () => {
    console.log(photourl);
    try {
      console.log(info.correntuser._id);
      await axios.put("http://localhost:3000/put", {
        userimgurl: photourl,
        _id: info.correntuser._id,
      });
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
  const onSubmit = async (data) => {
    console.log(data);

    try {
      await axios.post("http://localhost:3000/posts", {
        username: info.correntuser._id,
        comment: data.text,
        imgurl: data.url,
      });

      Navigate("/");
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
  function handlephotoclick() {
    if (changephoto) {
      setChangephoto(false);
    } else {
      setChangephoto(true);
    }
  }
  return (
    <div className="body">
      <div className="contiener">
        <div className="profileopening">
          <img
            onClick={handlephotoclick}
            id="profilephoto"
            src={info.correntuser.userimgurl}
            alt={info.correntuser.firstname}
          />
          <div>
            {changephoto ? (
              <div>
                <input onChange={(e) => onchange(e)} type="file" />
                <br />
                <button onClick={onSubmit2}>change</button>
              </div>
            ) : (
              <div></div>
            )}

            <h1>
              welcome to your profile {info.correntuser.firstname}{" "}
              {info.correntuser.lastname}
            </h1>
          </div>
        </div>
        <div className="postpostform">
          <h2>add new post:</h2>
          <form id="addpostform" onSubmit={handleSubmit(onSubmit)}>
            <label>image url:</label>
            <br />
            <textarea placeholder="imge url" type="text" {...register("url")} />
            <br />

            <label>text:</label>
            <br />
            <textarea
              placeholder="post text"
              type="text"
              {...register("text", { required: true })}
            />
            {errors.text && <div>text is required</div>}
            <br />

            <input type="submit" />
          </form>
        </div>
        <div className="postscard">
          {filteredcom?.reverse().map((item) => (
            <div className="margin">
              <Posts post={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Profile;
