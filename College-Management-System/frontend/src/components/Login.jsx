import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please fill in all the fields!");
    }
  };

  return (
    <div className="bg-gray-900 h-[100vh] w-full flex justify-between items-center">
      <img
        className="w-[60%] h-[100vh] object-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1LA2K0kSftGytr9-fW9Zs6_hi1gce9LWgFQ&s"
        alt="Login Background"
      />
      <div className="w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-blue-500 text-white">
          {selected && selected} Login
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[70%]">
            <label className="mb-1 text-white" htmlFor="eno">
              {selected && selected} Login ID
            </label>
            <input
              type="number"
              id="eno"
              required
              className="bg-gray-800 text-white outline-none border-2 border-gray-600 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col w-[70%] mt-3">
            <label className="mb-1 text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-gray-800 text-white outline-none border-2 border-gray-600 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("password")}
            />
          </div>
          <button className="bg-blue-600 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-800 transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className={`text-blue-400 mr-6 text-base font-semibold hover:text-blue-600 ${
            selected === "Student" && "border-b-2 border-blue-500"
          }`}
          onClick={() => setSelected("Student")}
        >
          Student
        </button>
        <button
          className={`text-blue-400 mr-6 text-base font-semibold hover:text-blue-600 ${
            selected === "Faculty" && "border-b-2 border-blue-500"
          }`}
          onClick={() => setSelected("Faculty")}
        >
          Faculty
        </button>
        <button
          className={`text-blue-400 mr-6 text-base font-semibold hover:text-blue-600 ${
            selected === "Admin" && "border-b-2 border-blue-500"
          }`}
          onClick={() => setSelected("Admin")}
        >
          Admin
        </button>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
