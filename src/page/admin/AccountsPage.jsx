import React from "react";
import { LoaderCircle, Pencil, Plus, Search, ShieldCheck, Trash2, UserRound, UserRoundX } from "lucide-react";
import useAccountsAdmin from "../../hook/account/useAccountsAdmin";
import AccountActionModal from "../../components/admin/account/AccountActionModal";
import AccountFormModal from "../../components/admin/account/AccountFormModal";

const AccountsPage = () => {
  const {
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
  } = useAccountsAdmin();

  return (
    <section className="!space-y-6" dir="rtl">
      <header className="flex flex-col gap-4 !rounded-2xl border !border-[#ddf1f2] !bg-white !p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#174b5a]">إدارة الحسابات</h1>
          <p className="!mt-1 text-sm text-gray-600">
            عرض حسابات المستخدمين وإدارتها
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174b5a] !px-5 !py-3 font-semibold text-white transition hover:bg-[#287c91]"
        >
          <Plus size={19} aria-hidden="true" />
          إضافة حساب
        </button>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl bg-white !p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="ابحث بالاسم أو البريد الإلكتروني"
            className="w-full rounded-xl border !py-2.5 !pr-10 !pl-4"
          />
        </label>
        <span className="text-sm text-gray-600">
          عدد الحسابات: {filteredAccounts.length}
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white !p-10 text-[#174b5a]">
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          جاري تحميل الحسابات...
        </div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 !p-5 text-center text-red-800" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={loadAccounts}
            className="mt-3 rounded-lg border border-red-300 !px-4 !py-2"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : filteredAccounts.length === 0 ? (
        <p className="rounded-2xl bg-white !py-10 text-center text-gray-600 shadow-sm">
          {search ? "لا توجد حسابات تطابق البحث" : "لا توجد حسابات"}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#ddf1f2] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right">
              <thead className="bg-[#f5f8f7] text-sm text-[#174b5a]">
                <tr>
                  <th className="!px-4 !py-3 font-bold">الحساب</th>
                  <th className="!px-4 !py-3 font-bold">البريد الإلكتروني</th>
                  <th className="!px-4 !py-3 font-bold">الصلاحية</th>
                  <th className="!px-4 !py-3 font-bold">الحالة</th>
                  <th className="!px-4 !py-3 font-bold">تاريخ الإنشاء</th>
                  <th className="!px-4 !py-3 font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAccounts.map((account) => (
                  <tr key={account._id} className="hover:bg-gray-50">
                    <td className="!px-4 !py-4 font-semibold text-gray-800">
                      {account.firstName} {account.lastName}
                    </td>
                    <td className="!px-4 !py-4 text-gray-600" dir="ltr">
                      {account.email}
                    </td>
                    <td className="!px-4 !py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 !px-3 !py-1 text-sm text-blue-800">
                        {account.role === "admin" ? (
                          <><ShieldCheck size={15} /> أدمن</>
                        ) : (
                          <><UserRound size={15} /> مستخدم</>
                        )}
                      </span>
                    </td>
                    <td className="!px-4 !py-4">
                      <span className={`rounded-full !px-3 !py-1 text-sm ${
                        account.isActive
                          ? "bg-green-50 text-green-800"
                          : "bg-amber-50 text-amber-800"
                      }`}>
                        {account.isActive ? "نشط" : "معلّق"}
                      </span>
                    </td>
                    <td className="!px-4 !py-4 text-sm text-gray-600">
                      {account.createdAt
                        ? new Date(account.createdAt).toLocaleDateString("ar")
                        : "—"}
                    </td>
                    <td className="!px-4 !py-4">
                      {account.role === "user" ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(account)}
                            aria-label={`تعديل حساب ${account.firstName} ${account.lastName}`}
                            title="تعديل"
                            className="rounded-lg border border-[#ddf1f2] p-2 text-[#174b5a] hover:bg-[#f5f8f7]"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              openActionModal(
                                account,
                                account.isActive ? "suspend" : "activate",
                              )
                            }
                            aria-label={`${account.isActive ? "تعليق" : "تفعيل"} حساب ${account.firstName} ${account.lastName}`}
                            title={account.isActive ? "تعليق الحساب" : "إعادة التفعيل"}
                            className={`rounded-lg border p-2 ${
                              account.isActive
                                ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                                : "border-green-200 text-green-700 hover:bg-green-50"
                            }`}
                          >
                            <UserRoundX size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openActionModal(account, "delete")}
                            aria-label={`حذف حساب ${account.firstName} ${account.lastName}`}
                            title="حذف الحساب"
                            className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">محمي</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal?.type === "form" && (
        <AccountFormModal
          account={modal.account}
          loading={isSaving}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
      {modal?.type === "action" && (
        <AccountActionModal
          account={modal.account}
          action={modal.action}
          loading={isSaving}
          onConfirm={handleAction}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default React.memo(AccountsPage);
