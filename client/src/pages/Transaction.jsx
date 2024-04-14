import { useState } from 'react';
import ProfileSubContent from '../components/ProfileSubContent';
import { useSearchParams } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import AlternateLink from '../components/AlternateLink';
import axios from 'axios';

const Transaction = () => {
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const id = searchParams.get('id');

  const [amount, setAmount] = useState(0);
  return (
    <div className="bg-purple-600 min-h-screen w-full flex justify-center items-center px-10 py-5">
      <div className="max-w-fit bg-white rounded-lg p-10 flex flex-col gap-4 justify-center items-center">
        <ProfileSubContent username={`${firstName} ${lastName}`} />
        <div className="flex flex-col gap-1 justify-center items-center">
          <label className="w-full text-left pl-1">Enter Amount: </label>
          <input
            className="py-1 px-2 border-2 rounded-lg"
            type="number"
            placeholder={0}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <ActionButton
          text={'Send'}
          onClick={() => {
            axios.post(
              'http://localhost:8000/api/v1/account/transfer',
              {
                receiver: id,
                amount: Number(amount),
              },
              {
                headers: {
                  Authorization: localStorage.getItem('token'),
                },
              }
            );
          }}
        />
        <AlternateLink
          linkText={'Go Back'}
          toLink={'/dashboard'}
        />
      </div>
    </div>
  );
};

export default Transaction;
