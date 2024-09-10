import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", formData); 
      setMessage("User registered successfully");
      setError(""); 
    } catch (error) {
     
      const errorMessage = error.response?.data?.message || "Error registering user";
      setMessage("");
      setError(errorMessage);
    }
  };

  return (
    <main className="w-full h-[80vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold text-blue-800">
          Secure User Management System
        </h3>
        <p className="text-base text-blue-500">One step to secure world</p>
      </div>
      <form
        onSubmit={handleRegister}
        className="mt-10 flex flex-col items-center gap-3 w-full max-w-sm"
      >
        <div className="flex items-center">
          <label htmlFor="firstname" className="text-base w-24 text-left">
            Firstname
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className=" w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="lastname" className="text-base w-24 text-left">
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className=" w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="email" className="text-base w-24 text-left">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className=" w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 w-[80%]"
        >
          Register
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
        <span>
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>{" "}
        </span>
      </form>
    </main>
  );
};

export default Register;
