import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const TransactionFlag = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const navigate = useNavigate();
  function fetchInfo() {
    axios
      .get("http://localhost:3000/api/v1/user/details", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then()
      .catch(() => {
        navigate("/access-declined");
      });
  }

  useEffect(fetchInfo, []);

  if (status === "OK") {
    return (
      <div
        onMouseEnter={() => {
          setTimeout(() => {
            navigate("/dashboard");
          }, 2500);
        }}
        className="w-full min-h-screen bg-purple-500 flex flex-col items-center justify-center"
      >
        <p className="bg-white text-xl py-4 px-8 rounded-lg text-green-500 font-bold">
          Transaction Complete
        </p>
        <span className="py-2 px-6 animate-pulse text-white">
          Redirecting...
        </span>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      }}
      className="w-full min-h-screen bg-purple-500 flex flex-col items-center justify-center"
    >
      <p className="bg-white text-xl py-4 px-8 rounded-lg text-red-500 font-bold">
        Transaction Failed
      </p>
      <span className="py-2 px-6 animate-pulse text-white">Redirecting...</span>
    </div>
  );
};

export default TransactionFlag;
