import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import AlternateLink from '../components/AlternateLink';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-purple-600">
      <div className="flex flex-col gap-2 bg-white py-4 px-6 rounded-lg items-center">
        <Heading text={'Sign In'} />
        <SubHeading text={'Login using your valid credentials'} />
        <InputField
          labelName={'E-Mail'}
          type={'email'}
          placeholder={'johndoe@gmail.com'}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputField
          labelName={'Password'}
          type={'password'}
          placeholder={'John_doe123'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <ActionButton
          text={'Login'}
          onClick={async () => {
            const response = await axios.post(
              'http://localhost:8000/api/v1/user/login',
              {
                email,
                password,
              }
            );
            if (response) {
              const token = response.data.token;
              localStorage.setItem('token', `Bearer ${token}`);
              navigate('/dashboard');
            }
          }}
        />
        <AlternateLink
          text={'New to BankingApp?'}
          linkText={'Register Here'}
          toLink={'/register'}
        />
      </div>
    </div>
  );
};

export default Login;
