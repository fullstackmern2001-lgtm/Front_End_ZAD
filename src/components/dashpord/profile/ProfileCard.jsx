const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
      <img src={user.avatar} className="w-20 h-20 rounded-full object-cover" />
      <div>
        <h3 className="font-bold text-lg">{user.firstName}</h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-600 text-sm">{user.phone}</p>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);
