import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from '../components/Heading';
import InputField from '../components/InputField';
import SubHeading from '../components/SubHeading';
import ActionButton from '../components/ActionButton';
import AlternateLink from '../components/AlternateLink';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pin, setPin] = useState(0);
  const [password, setPassword] = useState('');

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-purple-600">
      <div className="flex flex-col gap-2 bg-white py-4 px-6 rounded-lg items-center">
        <Heading text={'Sign Up'} />
        <SubHeading text={'Provide the following credentials'} />
        <InputField
          labelName={'First Name'}
          type={'text'}
          placeholder={'John'}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputField
          labelName={'Last Name'}
          type={'text'}
          placeholder={'Doe'}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
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
          placeholder={'Johnd_doe123'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputField
          labelName={'Pin'}
          type={'password'}
          placeholder={'XXXX'}
          onChange={(e) => {
            setPin(e.target.value);
          }}
        />
        <ActionButton
          text={'Register'}
          onClick={() => {
            axios
              .post('http://localhost:8000/api/v1/user/register', {
                email,
                firstName,
                lastName,
                password,
                pin: Number(pin)
              })
              .then((response) => {
                localStorage.setItem('token', `Bearer ${response.data.token}`);
                navigate('/dashboard');
              });
          }}
        />
        <AlternateLink
          text={'Already have an account?'}
          linkText={'Login Here'}
          toLink={'/login'}
        />
      </div>
    </div>
  );
};

export default Register;
