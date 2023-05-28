import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoContext } from "../App";
import Posts from "../component/posts";

const Userprofile = () => {
  let { id } = useParams();
  const info = React.useContext(InfoContext);
  const [userprofile, setUserprofile] = useState();

  const [userposts, setUserposts] = useState();

  console.log(id);
  console.log(info);

  useEffect(() => {
    let temp = info?.userdata?.filter((user) => user._id == id);
    console.log(temp);
    setUserprofile(temp[0]);
    console.log(info.allposts);
    let temp2 = info?.allposts?.filter((post) => post?.username?._id == id);
    setUserposts(temp2);
    console.log(temp2);
  }, []);
  return (
    <div className="body">
      <div className="contiener">
        <div className="profileopening">
          <img
            id="profilephoto"
            src={userprofile?.userimgurl}
            alt={userprofile?.firstname}
          />
          <div>
            <h1>
              welcome to profile {userprofile?.firstname}{" "}
              {userprofile?.lastname}
            </h1>
          </div>
        </div>

        <div className="postscard">
          {userposts?.reverse().map((item) => (
            <div className="margin">
              <Posts post={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
