import React from "react";
import ReactDOM from "react-dom";

interface props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PhotoPicker({ onChange }: props) {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );
  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element")!
  );
}

export default PhotoPicker;
