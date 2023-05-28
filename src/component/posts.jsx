import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { InfoContext } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";

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
function posts(post) {
  const [commentstate, setCommentstate] = React.useState(post.post.comments);
  const [likesnum, setLikesnum] = React.useState(post.post.likes);
  const startlike = post.post.likes;
  const [expanded, setExpanded] = React.useState(false);
  const info = React.useContext(InfoContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, post) => {
    setCommentstate([...commentstate, data.text]);
  };
  const handlelike = async () => {
    if (post.post.userliked.includes(info.correntuser._id)) {
      setLikesnum(likesnum - 1);
    } else {
      setLikesnum(likesnum + 1);
    }
  };
  React.useEffect(() => {
    async function takeinformation() {
      try {
        await axios.patch("http://localhost:3000/post", {
          _id: post.post._id,
          comments: commentstate,
        });
        console.log(commentstate);
      } catch (err) {
        if (err.response) {
          console.log("Error in the res");
        } else if (err.request) {
          console.log("Error in the req");
        } else {
          console.log("Error", err.message);
        }
      }
    }
    takeinformation();
  }, [commentstate]);
  React.useEffect(() => {
    async function takeinformation2() {
      try {
        console.log(post.post);
        await axios.patch(
          "http://localhost:3000/post",
          post.post.userliked.includes(info.correntuser._id)
            ? {
                _id: post.post._id,
                userliked: post.post.userliked.filter(
                  (user) => user != info.correntuser._id
                ),
                likes: likesnum,
              }
            : {
                _id: post.post._id,
                userliked: [...post.post.userliked, info.correntuser._id],
                likes: likesnum,
              }
        );
      } catch (err) {
        if (err.response) {
          console.log("Error in the res");
        } else if (err.request) {
          console.log("Error in the req");
        } else {
          console.log("Error", err.message);
        }
      }
    }
    takeinformation2();
  }, [likesnum]);
  console.log(post);
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/profile/${post?.post.username?._id}`}>
          <CardHeader
            avatar={
              <Avatar
                alt={post?.post.username?.username}
                src={post?.post.username?.userimgurl}
              />
            }
            title={post?.post.username?.username}
          />
        </Link>
        <CardMedia
          component="img"
          height="194"
          image={post?.post.imgurl}
          alt={post?.post.comment}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post?.post.comment}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => handlelike(post.post)}
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">{likesnum}</IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <form
              id="addcommentform"
              onSubmit={handleSubmit((form) => onSubmit(form, post))}
            >
              <textarea
                placeholder="post text"
                type="text"
                {...register("text", { required: true })}
              />
              {errors.text && <div>text is required</div>}
              <br />

              <input type="submit" />
            </form>
            <Typography>
              <ul>
                {commentstate?.map((comment) => (
                  <li>{comment}</li>
                ))}
              </ul>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
export default posts;
