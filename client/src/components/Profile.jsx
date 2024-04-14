import { useNavigate } from 'react-router-dom';
import ProfileSubContent from './ProfileSubContent';

const Profile = ({ username, amount, onCLick }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-start border-2 py-3 px-6 rounded-lg">
      <ProfileSubContent username={username} />
      <div className="flex flex-col items-center justify-center">
        <p className="flex items-center justify-center gap-1 text-xl font-semibold">
          Balance: <span className="text-2xl text-gray-950">₹</span>
          {amount}
        </p>
        <button
          onClick={onCLick}
          className="text-gray-600 font-medium hover:text-green-600"
        >
          Refresh
        </button>
      </div>
      <button
        onClick={() => {
          navigate(`/profile-update/?name=${username}`);
        }}
        className="mt-5 bg-black text-white font-semibold py-2 px-10 rounded-lg"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
