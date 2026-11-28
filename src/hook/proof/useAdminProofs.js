import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProofs from "./useProofs";
import * as proofApi from "../../store/features/proof/proofServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import notify from "../useNotifaction";

const useAdminProofs = () => {
  const isCreatePage = useLocation().pathname.endsWith("/new");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { proofs, pagination, isLoading, error, reload } = useProofs(page, 8);
  const [selectedProof, setSelectedProof] = useState(null);
  const [deleteProof, setDeleteProof] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mutationError, setMutationError] = useState("");

  const closeForm = () => {
    setSelectedProof(null);
    setMutationError("");
    if (isCreatePage) navigate("/admin/proofs");
  };

  const handleSave = async (data) => {
    try {
      setIsSaving(true);
      setMutationError("");
      if (selectedProof) {
        await proofApi.updateProof(selectedProof._id, data);
        notify("تم تعديل التوثيق بنجاح", "success");
      } else {
        await proofApi.createProof(data);
        notify("تمت إضافة التوثيق بنجاح", "success");
      }

      await reload();
      setSelectedProof(null);
      if (isCreatePage) navigate("/admin/proofs");
    } catch (requestError) {
      const message = getApiErrorMessage(requestError, "تعذر حفظ التوثيق");
      setMutationError(message);
      notify(message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteProof) return;
    try {
      setIsDeleting(true);
      setMutationError("");
      await proofApi.deleteProof(deleteProof._id);
      notify("تم حذف التوثيق بنجاح", "success");
      setDeleteProof(null);
      if (proofs.length === 1 && page > 1) setPage((current) => current - 1);
      else await reload();
    } catch (requestError) {
      const message = getApiErrorMessage(requestError, "تعذر حذف التوثيق");
      setMutationError(message);
      notify(message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDelete = () => {
    if (!isDeleting) setDeleteProof(null);
  };
  const pageCount = pagination?.numberOfPages || 0;
  const openEdit = (proof) => setSelectedProof(proof);
  const requestDelete = (proof) => setDeleteProof(proof);
  const goToPage = (pageNumber) => setPage(pageNumber);

  return {
    isCreatePage,
    page,
    setPage,
    proofs,
    pagination,
    isLoading,
    error,
    reload,
    selectedProof,
    setSelectedProof,
    deleteProof,
    setDeleteProof,
    isSaving,
    isDeleting,
    mutationError,
    pageCount,
    closeForm,
    handleSave,
    handleDelete,
    closeDelete,
    openEdit,
    requestDelete,
    goToPage,
  };
};

export default useAdminProofs;
