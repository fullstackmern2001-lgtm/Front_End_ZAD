import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSlider,
  deleteSlider,
  getSliders,
  updateSlider,
} from "../../store/features/slider/sliderThunk";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import notify from "../useNotifaction";

const useSliderHook = () => {
  const dispatch = useDispatch();
  const { sliders, isFetching, isMutating, error } = useSelector(
    (state) => state.slider,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [form, setForm] = useState({ name: "", des: "", image: "" });
  const handleFormChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setForm((previous) => ({
      ...previous,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  useEffect(() => {
    dispatch(getSliders());
  }, [dispatch]);

  const handleOpenModal = useCallback((slider = null) => {
    if (slider) {
      setSelectedSlider(slider);
      setForm({
        _id: slider._id,
        name: slider.name,
        des: slider.des,
        image: slider.image,
        preview: slider.image,
      });
    } else {
      setSelectedSlider(null);
      setForm({ name: "", des: "", image: "" });
    }
    setModalOpen(true);
  }, []);

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (!form.name.trim() || (!selectedSlider && !(form.image instanceof File))) {
      notify("يرجى إدخال اسم السلايدر واختيار صورة", "warn");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("des", form.des);

    if (typeof File !== "undefined" && form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (selectedSlider) {
        await dispatch(
          updateSlider({ id: selectedSlider._id, formData }),
        ).unwrap();
      } else {
        await dispatch(createSlider(formData)).unwrap();
      }

      setModalOpen(false);
      setSelectedSlider(null);
      setForm({ name: "", des: "", image: "" });
      return true;
    } catch (requestError) {
      notify(
        getApiErrorMessage(
          { response: { data: { message: requestError } } },
          "تعذر حفظ السلايدر، يرجى المحاولة مرة أخرى",
        ),
        "error",
      );
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSlider(id)).unwrap();
      notify("تم حذف السلايدر بنجاح", "success");
    } catch (requestError) {
      notify(
        getApiErrorMessage(
          { response: { data: { message: requestError } } },
          "تعذر حذف السلايدر، يرجى المحاولة مرة أخرى",
        ),
        "error",
      );
    }
  };
  return {
    isLoading: isFetching || isMutating,
    isFetching,
    isMutating,
    error,
    reload: () => dispatch(getSliders()),
    handleOpenModal,
    modalOpen,
    setModalOpen,
    form,
    setForm,
    handleFormChange,
    handleImageChange,
    handleSubmit,
    sliders,
    handleDelete,
  };
};

export default useSliderHook;
