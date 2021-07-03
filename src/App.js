import React, { useState } from "react";
import CropperDemo from "./cropper";
import Crop from "./crop";
import EditPhotoDialog from "./NewCropper";

function App() {
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpen = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <div className="App">
      <button onClick={handleClickOpen} style={{ width:"500px", height: "40px", margin:"30px auto", background: "pink", cursor: "pointer" }}>
        Click to Open the NewCropper
      </button>
      <EditPhotoDialog open={openEdit} onClose={handleClose}></EditPhotoDialog>
      <CropperDemo />
      <Crop />
    </div>
  );
}

export default App;
