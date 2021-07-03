// React
import React, { useState, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';

import DialogModal from "./dialogModal";
import Button from "./Button";


const useStyles = makeStyles({
  buttons: {
    display: "flex",
    position: "absolute",
    right: "34px",
    bottom: "35px",
    "& > button": {
      marginLeft: "10px"
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "auto"
  },
  cropperContainer: {
    width: "200px",
    height: "200px",
    marginBottom: "15px",
    border: "1px solid #ccc"
  },
  delete: {
    position: "absolute",
    left: "40px",
    bottom: "45px",
    font: "400 14px Helvetica",
    color: "#5c5c5c",
    cursor: "pointer",
    textDecoration: "underline",
  },
  choose: {
    position: "relative",
    width: "150px",
    height: "38px",
    background: "#5c5c5c",
    borderRadius: "8px",
    cursor: "pointer",
    lineHeight: "38px",
    textAlign: "center",
    color: "#fff",
    font: "400 14px Helvetica",
    "&:hover" : {
      background: "#6c4193",
    }
  },
  input: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    right: 0,
    top: 0,
    opacity: 0,
    cursor: "pointer"
  },
  reset: {
    width: "100px",
    font: "400 14px Helvetica",
    color: "#5c5c5c",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      color: "#1890ff"
    }
  }
});
const FILE_TYPES = ["image/jpg", "image/png", "image/jpeg", "image/bmp"];

const EditPhotoDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const [photoUrl, setPhotoUrl] = useState("");
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState();
  const [isShow, setIsShow] = useState(false);
  const [zoomValue, setZoomValue] = React.useState(0);
  const [rotateValue, setRotateValue] = React.useState(50);

  useEffect(() => {
    if (photoUrl !== "") {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [photoUrl]);

  const handleReset = () => {
    if (typeof cropper !== "undefined") {
      cropper.reset();
      setRotateValue(50);
      setZoomValue(0);
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files.length > 0) {
      const fileMaxSize = 5120;
      let fileSize = files[0].size / 1024;
      if (fileSize > fileMaxSize) {
        alert("The max size of photo should be 5M！");
        return false;
      } else if (fileSize <= 0) {
        alert("The size can't be 0");
        return false;
      }

      // check the type of photo
      const fileType = files[0].type;
      console.log(fileType);
      if (!FILE_TYPES.includes(fileType)) {
        alert("please check the type of photo");
        return false;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result);
        handleReset();
      };
      reader.readAsDataURL(files[0]);
    } else {
      if (photoUrl === "") {
        alert("Please select the file");
      }
      return false;
    }
    setIsShow(true);
  };

  const onClear = () => {
    setPhotoUrl("");
  };
  const upload = () => {
    if (photoUrl === "") {
      alert("Please choose photo");
      return false;
    }
    if (typeof cropper !== "undefined") {
      const croppedImage = cropper
        .getCroppedCanvas({
          width: 135,
          height: 135
        })
        .toDataURL();
      setImage(croppedImage);
    }
  };

  const handleSliderChange = (e, newValue) => {
    let a = (newValue - zoomValue) / 100;
    if (typeof cropper !== "undefined") {
      cropper.zoom(a);
    }
    setZoomValue(newValue);
  };

  const handleRotateSliderChange = (e, newValue) => {
    let a = (newValue - rotateValue) * 3.6;
    if (typeof cropper !== "undefined") {
      cropper.rotate(a);
    }
    setRotateValue(newValue);
  };
 
  const marks = [
    {
      value: 0,
      label: "-180°"
    },
    {
      value: 50,
      label: "0°"
    },
    {
      value: 100,
      label: "180°"
    }
  ];
 const marksZoom = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 50,
    label: "0.5"
  },
  {
    value: 100,
    label: "1"
  }
 ]
  return (
    <>
      <DialogModal open={open} dialogTitle="Edit Photo" onClose={onClose}>
        <div className={classes.content}>
          <div className={classes.cropperContainer}>
            {isShow && (
              <Cropper
                style={{ width: 200, height: 200 }}
                aspectRatio={1}
                guides={false}
                src={photoUrl}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            )}
          </div>
        </div>

        <Grid container spacing={5} alignItems="center">
          <Grid item xs>
            <p>Zoom</p>
            <Slider
              value={zoomValue}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              marks={marksZoom}
            />
          </Grid>
          <Grid item xs>
            <p>Rotate</p>
            <Slider
              value={rotateValue}
              onChange={handleRotateSliderChange}
              aria-labelledby="input-slider"
              marks={marks}
            />
          </Grid>
        </Grid>
        <Tooltip title="Click to reset the image">
        <div className={classes.reset} onClick={handleReset}>
          Reset
        </div>
        </Tooltip>
        
        <div className={classes.delete} onClick={onClear}>
          Delete Photo
        </div>
        <div className={classes.buttons}>
          <div className={classes.choose}>
            Choose Photo
            <input
              className={classes.input}
              type="file"
              title=""
              accept="image/*"
              onChange={onChange}
            />
          </div>
          <Button
            BUTTON_TYPE="SMALL"
            button_name="Save Photo"
            onClick={upload}
          />
        </div>
        <div
          style={{
            width: 135,
            height: 135,
            margin: "60px auto",
            border: "1px solid #ccc",
            backgroundImage: `url(${image})`
          }}
        ></div>
      </DialogModal>
    </>
  );
};
export default EditPhotoDialog;
