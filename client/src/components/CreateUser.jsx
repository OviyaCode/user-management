/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const CreateUser = ({ onUserCreated }) => {
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    mobile: "",
    role: "user" // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", newUser);
      console.log(response)
      alert("User created successfully");
      onUserCreated();
      setNewUser({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        city: "",
        state: "",
        mobile: "",
        role: "user"
      });
    } catch (error) {
      alert("Error creating user", error);
    }
  };

  return (
    <div className="w-[50%] bg-white border-2 border-gray-100 p-20">
      <h3 className="text-xl text-blue-500 mb-10 mt-[-20]">Create User</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label className="w-24 text-left">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={newUser.firstname}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">LastName</label>
          <input
            type="text"
            name="lastname"
            value={newUser.lastname}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">DOB</label>
          <input
            type="date"
            name="dob"
            value={newUser.dob}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">Gender</label>
          <select
            name="gender"
            value={newUser.gender}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">City</label>
          <input
            type="text"
            name="city"
            value={newUser.city}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">State</label>
          <input
            type="text"
            name="state"
            value={newUser.state}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={newUser.mobile}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-left">Role</label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="rounded border-2 border-gray-300 w-64 py-1 px-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          className="bg-blue-500 rounded w-fit px-3 py-2 text-white"
          type="submit"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
