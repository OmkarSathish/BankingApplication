import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../components/Heading";
import axios from "axios";
import ProfileSubContent from "../components/ProfileSubContent";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";

const UpdateProfile = () => {
  const naviagte = useNavigate();
  const [searchParams] = useSearchParams();
  let [name, setName] = useState(searchParams.get("name"));
  const [email, setEmail] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [password, setPassword] = useState("");
  let [pin, setPin] = useState();
  let [toFetch, setToFetch] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/details", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      })
      .catch(() => {
        naviagte("/access-declined");
      });
  }, [toFetch]);

  return (
    <div className="bg-purple-600 min-h-screen w-full flex justify-center items-start px-10 py-5">
      <div className="w-full bg-white rounded-lg py-8 px-4">
        <div className="rounded-lg border-2 p-4">
          <Heading text={"Update Profile"} />
        </div>
        <div className="flex gap-4 items-start justify-center p-8">
          <div className="flex flex-col py-[79px] gap-2 items-center justify-center flex-1 border-2 rounded-lg flex-grow">
            <ProfileSubContent username={name} />
            <p className="font-semibold">{email}</p>
            <button
              className="cursor-pointer text-green-600 hover:text-green-800"
              onClick={() => setToFetch((pre) => !pre)}
            >
              Refresh Details
            </button>
          </div>
          <div className="flex flex-col items-center px-10 py-[25px] gap-4 justify-center flex-1 border-2 rounded-lg">
            <InputField
              labelName={"First Name"}
              type={"text"}
              placeholder={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <InputField
              labelName={"Last Name"}
              type={"text"}
              placeholder={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <InputField
              labelName={"Password"}
              type={"password"}
              placeholder={"Enter New Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputField
              labelName={"Pin"}
              type={"password"}
              placeholder={"Enter New Pin"}
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />
            <ActionButton
              text={"Update"}
              onClick={() => {
                axios
                  .put(
                    "http://localhost:8000/api/v1/user/update",
                    {
                      firstName,
                      lastName,
                      password,
                      pin,
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((response) => setName(response.data.firstName));
              }}
            />
          </div>
        </div>
        <p
          onClick={() => {
            naviagte("/dashboard");
          }}
          className="w-full text-center font-medium text-lg tracking-tight text-black underline hover:no-underline"
        >
          Go Back
        </p>
      </div>
    </div>
  );
};

export default UpdateProfile;
