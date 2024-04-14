import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex items-center justify-between border-2 py-3 px-6 rounded-lg">
      <span className="text-purple-700 font-extrabold tracking-tight text-xl">
        BankingApp
      </span>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        className="font-normal text-lg tracking-tight hover:text-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
