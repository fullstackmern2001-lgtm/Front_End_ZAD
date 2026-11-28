import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../store/baseUrl";
import notify from "../useNotifaction";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useAccountsAdmin = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadAccounts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.get("/user/admin/accounts");
      setAccounts(response.data?.data || []);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل الحسابات"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return accounts;
    return accounts.filter((account) =>
      `${account.firstName} ${account.lastName} ${account.email}`
        .toLowerCase()
        .includes(query),
    );
  }, [accounts, search]);

  const handleSave = async (form) => {
    setIsSaving(true);
    try {
      if (modal.account) {
        const { firstName, lastName, email, role } = form;
        const response = await api.put(
          `/user/admin/accounts/${modal.account._id}`,
          { firstName, lastName, email, role },
        );
        setAccounts((current) =>
          current.map((account) =>
            account._id === modal.account._id ? response.data.data : account,
          ),
        );
        notify("تم تحديث الحساب بنجاح", "success");
      } else {
        const response = await api.post("/user/admin/accounts", form);
        setAccounts((current) => [response.data.data, ...current]);
        notify("تم إنشاء الحساب بنجاح", "success");
      }
      setModal(null);
    } catch (requestError) {
      notify(
        getApiErrorMessage(requestError, "تعذر حفظ الحساب"),
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAction = async () => {
    setIsSaving(true);
    const { account, action } = modal;
    try {
      if (action === "delete") {
        await api.delete(`/user/admin/accounts/${account._id}`);
        setAccounts((current) =>
          current.filter((item) => item._id !== account._id),
        );
        notify("تم حذف الحساب", "success");
      } else {
        const response = await api.patch(
          `/user/admin/accounts/${account._id}/status`,
          { isActive: action === "activate" },
        );
        setAccounts((current) =>
          current.map((item) =>
            item._id === account._id ? response.data.data : item,
          ),
        );
        notify(response.data.message, "success");
      }
      setModal(null);
    } catch (requestError) {
      notify(getApiErrorMessage(requestError, "تعذر تنفيذ الإجراء"), "error");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateModal = () => setModal({ type: "form" });
  const openEditModal = (account) => setModal({ type: "form", account });
  const openActionModal = (account, action) =>
    setModal({ type: "action", account, action });
  const closeModal = () => {
    if (!isSaving) setModal(null);
  };
  const handleSearchChange = (event) => setSearch(event.target.value);

  return {
    filteredAccounts,
    search,
    isLoading,
    error,
    modal,
    isSaving,
    loadAccounts,
    handleSave,
    handleAction,
    handleSearchChange,
    openCreateModal,
    openEditModal,
    openActionModal,
    closeModal,
  };
};

export default useAccountsAdmin;
