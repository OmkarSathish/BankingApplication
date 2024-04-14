const ProfileSubContent = ({ username }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="h-16 w-16 rounded-full bg-black text-white text-4xl font-extrabold flex items-center justify-center capitalize">
        {username[0]}
      </span>
      <p className="font-medium text-3xl capitalize">{username}</p>
    </div>
  );
};

export default ProfileSubContent;
