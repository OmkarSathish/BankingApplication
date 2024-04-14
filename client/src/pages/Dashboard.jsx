import axios from 'axios';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import Topbar from '../components/Topbar';
import Users from '../components/Users';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState(0);

  function fetchInfo() {
    axios
      .get('http://localhost:8000/api/v1/account/balance', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
        setName(response.data.firstName);
      })
      .catch(() => {
          navigate('/access-declined')
      });
  }

  useEffect(fetchInfo, []);

  return (
    <div className="bg-purple-600 min-h-screen w-full flex justify-center items-start px-10 py-5">
      <div className="w-full bg-white rounded-lg py-2 px-4">
        <div className="flex flex-col gap-2">
          <Topbar />
          <Profile
            username={name}
            amount={balance}
            onCLick={fetchInfo}
          />
          <Users />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
