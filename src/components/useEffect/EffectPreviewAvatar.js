import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function EffectPreviewAvatar() {
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

  useEffect(() => {
    // Cleanup preview URLs to avoid memory leaks
    return () => {
      avatars.forEach((avatar) => URL.revokeObjectURL(avatar.preview));
    };
  }, [avatars]);

  return (
    <div>
      <Input type="file" multiple onChange={handlePreviewAvatar} />

      {avatars.length > 0 &&
        avatars.map((avatar, index) => (
          <img key={index} src={avatar.preview} alt="" width="80%" />
        ))}
    </div>
  );
}
