import Modal from "../Modal";
import useEditeUserProfile from "../../../hook/profile/useEditeUserProfile";
import { Loader2 } from "lucide-react";
import React from "react";
const EditProfileModal = ({ onClose, user }) => {
  const {
    form,
    handleSubmit,
    handleImageChange,
    handleChange,
    isLoading,
  } = useEditeUserProfile(user, onClose);

  return (
    <Modal onClose={onClose}>
      <h3 className="font-bold text-xl !mb-4">تعديل البيانات الشخصيه</h3>

      {/* Avatar */}
      <div className="flex justify-center !mb-4">
        <label className="relative cursor-pointer group">
          <img
            src={form?.avatar}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="absolute inset-0 rounded-full bg-green-900/50 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
            تغيير
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Inputs */}
      <div className="!space-y-3">
        <input
          type="text"
          name="firstName"
          value={form?.firstName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-xl !px-4 !py-2"
        />

        <input
          type="email"
          name="email"
          value={form?.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-xl !px-4 !py-2"
        />

        <input
          type="tel"
          name="phone"
          value={form?.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border !rounded-xl !px-4 !py-2"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 !mt-6">
        <button onClick={onClose} className="!px-5 !py-2 !rounded-full border">
          الغاء
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-full bg-green-900 text-white hover:bg-green-700 transition flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              تحميل...
            </>
          ) : (
            "حفظ التعديل"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default React.memo(EditProfileModal);
