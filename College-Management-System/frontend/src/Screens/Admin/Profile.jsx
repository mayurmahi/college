import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserData } from "../../redux/actions";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { employeeId: router.state.loginid },
        { headers: headers }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              semester: response.data.user[0].semester,
              enrollmentNo: response.data.user[0].enrollmentNo,
              branch: response.data.user[0].branch,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/admin/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        { headers: headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/admin/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        { headers: headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto my-8 flex justify-between items-start bg-gray-900 text-gray-100 p-8 rounded-lg shadow-lg">
      {data && (
        <>
          <div>
            <p className="text-2xl font-semibold text-white">
              Hello Yash Jadhav
            </p>
            <div className="mt-3">
              <p className="text-lg font-normal text-gray-300 mb-2">
                Employee Id: {data.employeeId}
              </p>
              <p className="text-lg font-normal text-gray-300 mb-2">
                Phone Number: +91 9876123445
              </p>
              <p className="text-lg font-normal text-gray-300 mb-2">
                Email Address: yash@gmail.com
              </p>
            </div>
            <button
              className={`${
                showPass ? "bg-red-600 text-white" : "bg-blue-600 text-white"
              } px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start pt-4"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-3 py-2 border-2 border-blue-500 outline-none rounded mt-4 bg-gray-800 text-gray-100"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-3 py-2 border-2 border-blue-500 outline-none rounded mt-4 bg-gray-800 text-gray-100"
                />
                <button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
          <img
            src="data:image/jpeg;base64,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"
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
          />
        </>
      )}
    </div>
  );
};

export default Profile;
