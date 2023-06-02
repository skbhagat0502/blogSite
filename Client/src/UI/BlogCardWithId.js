import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "../css/BlogCard.module.css";
import Overlay from "../components/Overlay";
import toast from "react-hot-toast";

export default function BlogCardWithId({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const [overlayMessage, setOverlayMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const todayDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  var formattedDate =
    todayDate +
    " " +
    monthNames[month] +
    " " +
    year +
    " at " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  const defaultProfile = username && username.substring(0, 1);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
        navigate("../my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOverlayToggle = (message) => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
    setOverlayMessage(message);
  };
  return (
    <>
      <Card
        sx={{
          width: "30%",
          margin: "0.5rem auto",
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
        className={classes.blogCard}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {defaultProfile}
            </Avatar>
          }
          title={username}
          subheader={formattedDate}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {isUser && (
          <Box display={"flex"}>
            <IconButton
              onClick={() => handleOverlayToggle("update")}
              sx={{ marginLeft: "auto" }}
            >
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={() => handleOverlayToggle("delete")}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      </Card>
      {showOverlay && (
        <Overlay
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleOverlayToggle={handleOverlayToggle}
          message={overlayMessage}
        />
      )}
    </>
  );
}
