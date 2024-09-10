import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.token);
      setToken(response.data.token);
      navigate("/home");
      setError("");
    } catch (error) {
      // setError("Please check your credentials and try again");
      console.log(error);
    }
  };
  return (
    <main className="w-full h-[70vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold text-blue-800">
          Secure User Management System
        </h3>
        <p className="text-base text-blue-500">One step to secure world</p>
      </div>
      <form
        onSubmit={handleLogin}
        className="mt-10 flex flex-col items-center gap-3 w-full max-w-sm"
      >
        <div className="flex items-center">
          <label htmlFor="email" className="text-base w-24 text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="password" className="text-base w-24 text-left">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 w-[80%]"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <span>
          new to Secure User Management ?{" "}
          <Link to="/register" className="text-blue-500">
            Create new
          </Link>{" "}
        </span>
      </form>
    </main>
  );
};

export default Login;
