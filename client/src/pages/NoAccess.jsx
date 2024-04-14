import { useNavigate } from 'react-router-dom';

const NoAccess = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-purple-600 min-h-screen w-full flex justify-center items-start px-10 py-5">
      <div className="w-full bg-white rounded-lg py-2 px-4">
        <p className="border-2 rounded-lg p-4 text-center w-full text-xl font-semibold tracking-tight">
          <span
            onClick={() => {
              navigate('/register');
            }}
            className="cursor-pointer underline hover:no-underline font-extrabold"
          >
            Register
          </span>{' '}
          or {' '}
          <span
            onClick={() => {
              navigate('/login');
            }}
            className="cursor-pointer underline hover:no-underline font-extrabold"
          >
            Login
          </span> {' '}
          to visit the &apos;Users Only&apos; pages
        </p>
      </div>
    </div>
  );
};

export default NoAccess;
