import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  return (
    <div className="shadow-md px-6 py-4 bg-gray-800">
      <div className="max-w-6xl flex justify-between items-center mx-auto">
        <p
          className="font-semibold text-2xl flex justify-center items-center cursor-pointer text-white"
          onClick={() => navigate("/")}
        >
          <span className="mr-2 text-white">
            <RxDashboard />
          </span>{" "}
          {router.state && router.state.type} Dashboard
        </p>
        <button
          className="flex justify-center items-center text-red-400 px-3 py-2 font-semibold rounded-sm hover:bg-red-500 hover:text-white"
          onClick={() => navigate("/")}
        >
          Logout
          <span className="ml-2">
            <FiLogOut />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
