import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSliderHook from "./useSliderHook";

const useSliderAdminPage = () => {
  const isCreatePage = useLocation().pathname.endsWith("/new");
  const navigate = useNavigate();
  const sliderAdmin = useSliderHook();

  useEffect(() => {
    if (isCreatePage) sliderAdmin.handleOpenModal();
  }, [isCreatePage, sliderAdmin.handleOpenModal]);

  const submitSlider = async () => {
    const saved = await sliderAdmin.handleSubmit();
    if (saved && isCreatePage) navigate("/admin/sliders");
  };

  const closeSliderModal = () => {
    sliderAdmin.setModalOpen(false);
    if (isCreatePage) navigate("/admin/sliders");
  };

  return { ...sliderAdmin, isCreatePage, submitSlider, closeSliderModal };
};

export default useSliderAdminPage;
