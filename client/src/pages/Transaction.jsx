import { useState } from "react";
import ProfileSubContent from "../components/ProfileSubContent";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import AlternateLink from "../components/AlternateLink";
import axios from "axios";

const Transaction = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [after, setAfter] = useState(false);
  const [status, setStatus] = useState("NOT OK");
  const [msg, setMsg] = useState("");

  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const id = searchParams.get("id");

  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState(0);

  if (!after)
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
          <div className="flex flex-col gap-1 justify-center items-center">
            <label className="w-full text-left pl-1">Enter Pin: </label>
            <input
              className="py-1 px-2 border-2 rounded-lg"
              type="password"
              placeholder={"XXXX"}
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />
          </div>
          <ActionButton
            text={"Send"}
            onClick={() => {
              axios
                .post(
                  "http://localhost:8000/api/v1/account/transfer",
                  {
                    receiver: id,
                    amount: Number(amount),
                    pin: Number(pin),
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                )
                .then(({ data }) => {
                  setStatus(data.status);
                  setMsg(data.message);
                  setStatus("OK");
                  setAfter(true);
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 2500);
                })
                .catch((err) => {
                  setMsg(err.response.data.message);
                  setStatus(err.response.data.status);
                  setStatus("NOT OK");
                  setAfter(true);
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 2500);
                });
            }}
          />
          <AlternateLink
            linkText={"Go Back"}
            toLink={"/dashboard"}
          />
        </div>
      </div>
    );

  return (
    <div className="bg-purple-600 min-h-screen w-full flex justify-center items-center">
      <div className="max-w-fit bg-white rounded-lg flex flex-col gap-1 justify-center items-center py-2 px-10">
        {status === "OK" ? (
          <p className="text-green-500 text-xl font-semibold">{msg}</p>
        ) : (
          <p className="text-red-500 text-xl font-semibold">{msg}</p>
        )}
        <span className="animate-pulse text-sm">Redirecting...</span>
      </div>
    </div>
  );
};

export default Transaction;
