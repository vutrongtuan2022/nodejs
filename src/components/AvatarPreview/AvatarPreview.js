import React, { useEffect, useState } from "react";
import Input from "../Input/Input";

const AvatarPreview = ({ className }) => {
  const [avatars, setAvatars] = useState([]);

  const handlePreviewAvatar = (e) => {
    const files = e.target.files;
    const previewFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      file.preview = URL.createObjectURL(file);
      previewFiles.push(file);
    }

    setAvatars(previewFiles);
  };

  const handleRemoveAvatar = (indexToRemove) => {
    setAvatars(avatars.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    // Cleanup preview URLs to avoid memory leaks
    return () => {
      avatars.forEach((avatar) => URL.revokeObjectURL(avatar.preview));
    };
  }, [avatars]);

  return (
    <div className={className}>
      <Input type="file" multiple onChange={handlePreviewAvatar} />

      {avatars.length > 0 &&
        avatars.map((avatar, index) => (
          <div key={index} style={{ position: "relative", display: "inline-block", marginRight: '10px' }}>
            <img src={avatar.preview} alt="" width="80%" />
            <button
              onClick={() => handleRemoveAvatar(index)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default AvatarPreview;
