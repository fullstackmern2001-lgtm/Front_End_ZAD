import { useEffect, useRef, useState } from "react";

const useProofForm = (proof, loading, onSave, onClose) => {
  const [title, setTitle] = useState(proof?.title || "");
  const [description, setDescription] = useState(proof?.description || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(proof?.image || "");
  const previewUrl = useRef("");

  useEffect(
    () => () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    },
    [],
  );

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    event.target.value = "";
    if (!file) return;

    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = URL.createObjectURL(file);
    setImage(file);
    setPreview(previewUrl.current);
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) =>
    setDescription(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title.trim());
    data.append("description", description.trim());
    if (image) data.append("image", image);
    onSave(data);
  };

  const handleClose = () => {
    if (!loading) onClose();
  };

  return {
    title,
    description,
    preview,
    image,
    handleImageChange,
    handleTitleChange,
    handleDescriptionChange,
    handleSubmit,
    handleClose,
  };
};

export default useProofForm;
