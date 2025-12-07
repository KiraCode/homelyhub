import React, { useState } from "react";

const ImagesUploading = () => {
  const [image, setImage] = useState("");
  const [imagesList, setImagesList] = useState([]);

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Read the file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
      handleAddImage();
    }
  };

  const handleAddImage = () => {
    if (image) {
      setImagesList([...imagesList, image]);
      setImage("");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImagesList = [...imagesList];
    updatedImagesList.splice(index, 1);
    setImagesList(updatedImagesList);
  };

  return (
    <div className="photos-container">
      <h4 className="photos-header">Photos</h4>
      <label className="form-labels">More=Better</label>
      <div className="image-link-container">
        <input
          className="image-link"
          type="text"
          placeholder="Add using link /.jpg"
          onChange={handleImage}
          value={image}
        />
        <button className="add-button" type="button" onClick={handleAddImage}>
          Add
        </button>
      </div>
      <div className="image-list-container">
        {imagesList.map((imageUrl, index) => (
          <img
            key={index}
            alt={`Ige-${index}`}
            src={imageUrl}
            onClick={() => handleDeleteImage(index)}
          />
        ))}
        <label className="upload">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          ></input>
          <span class="material-symbols-outlined">upload</span>
          Upload Photo
        </label>
      </div>
    </div>
  );
};

export default ImagesUploading;
