import { useLocation, useNavigate } from "react-router-dom";
import useServicesAdmin from "./useServicesAdmin";

const useServicesAdminPage = () => {
  const isCreatePage = useLocation().pathname.endsWith("/new");
  const navigate = useNavigate();
  const serviceAdmin = useServicesAdmin();

  const submitService = async (event) => {
    const saved = await serviceAdmin.handleSubmit(event);
    if (saved && isCreatePage) navigate("/admin/services");
  };

  return { ...serviceAdmin, isCreatePage, submitService };
};

export default useServicesAdminPage;
