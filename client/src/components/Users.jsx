import axios from 'axios';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  let [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/bulk/?filter=${filter}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        setUsers(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <InputField
        type={'text'}
        placeholder={'Search Users...'}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center items-center py-4 gap-4 rounded-lg">
        {isLoading ? (
          <p className="font-normal w-full text-xl text-gray-500 tracking-tight text-center">
            Loading users...
          </p>
        ) : users.length === 0 ? (
          <p className="font-normal text-xl text-gray-500 tracking-tight w-full text-center">
            No users found (or data is not loaded yet)
          </p>
        ) : (
          users.map((user) => (
            <User
              key={user.userId}
              firstName={user.firstName}
              lastName={user.lastName}
              userId={user.userId}
            />
          ))
        )}
      </div>
    </div>
  );
};

const User = ({ firstName, lastName, userId }) => {
  const navigate = useNavigate();

  return (
    <div className="w-80 rounded-lg border-2 flex flex-col gap-2 items-center justify-center py-2 px-4 hover:bg-gray-200">
      <span className="flex items-center justify-center h-10 w-10 rounded-full text-lg font-extrabold capitalize bg-black text-white py-1 px-2">
        {firstName[0]}
      </span>
      <h1 className="text-xl font-semibold tracking-tight capitalize">
        {firstName}
      </h1>
      <p className="text-gray-500 font-medium tracking-tight mt-[-8px] mb-[4px] capitalize text-center leading-[1.2]">
        {firstName} {lastName}
      </p>
      <button
        onClick={() => {
          navigate(
            `/transfer/?id=${userId}&firstName=${firstName}&lastName=${lastName}`
          );
        }}
        className="w-full bg-black text-white py-2 px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default Users;
