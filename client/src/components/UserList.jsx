import { useEffect, useState } from "react";
import axios from "axios";
import CreateUser from "./CreateUser";
import * as XLSX from "xlsx";

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/users/${selectedUser._id}`,
        selectedUser
      );
      alert("User updated successfully");
      setSelectedUser(null);
      fetchUsers(); // Refresh user list
    } catch (error) {
      alert("Error updating user", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${userId}`);
        alert("User deleted successfully");
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        alert("Error deleting user", error);
      }
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const handleUserCreated = () => {
    setShowCreateUser(false);
    fetchUsers(); // Refresh user list
  };

  return (
    <div className="w-full flex flex-col h-[100vh]">
      <h2 className="text-2xl font-semibold text-blue-800"> Users Details</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowCreateUser(!showCreateUser)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showCreateUser ? "Cancel" : "Create User"}
        </button>
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export to Excel
        </button>
      </div>
      <div className="flex gap-5">
        {showCreateUser && <CreateUser onUserCreated={handleUserCreated} />}
        <div className="w-[75%]">
          <table border="0" className="bg-gray-200 w-full">
            <thead>
              <tr className="py-2">
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Role</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>City</th>
                <th>State</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  className="bg-gray-100 cursor-pointer"
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                >
                  <td className="py-4 my-2">{user.firstname}</td>
                  <td className="py-4 my-2">{user.lastname}</td>
                  <td className="py-4 my-2">{user.email}</td>
                  <td className="py-4 my-2">{user.role}</td>
                  <td className="py-4 my-2">{formatDate(user.dob)}</td>
                  <td className="py-4 my-2">{user.gender}</td>
                  <td className="py-4 my-2">{user.city}</td>
                  <td className="py-4 my-2">{user.state}</td>
                  <td className="py-4 my-2">{user.mobile}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        {selectedUser && (
          <div className="w-[50%] bg-white border-2 border-gray-100 p-20">
            <h3 className="text-xl text-blue-500 mb-10 mt-[-20]">Edit User</h3>
            <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
              <div className="flex items-center">
                <label className="w-24 text-left">Firstname</label>
                <input
                  type="text"
                  value={selectedUser.firstname}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstname: e.target.value,
                    })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-left">LastName</label>
                <input
                  type="text"
                  value={selectedUser.lastname}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastname: e.target.value,
                    })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-left">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-left">DOB</label>
                <input
                  type="date"
                  value={formatDateForInput(selectedUser.dob) || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, dob: e.target.value })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-left">Gender</label>
                <select
                  value={selectedUser.gender || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, gender: e.target.value })
                  }
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
                  value={selectedUser.city || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, city: e.target.value })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-left">State</label>
                <input
                  type="text"
                  value={selectedUser.state || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, state: e.target.value })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-left">Mobile</label>
                <input
                  type="text"
                  value={selectedUser.mobile || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, mobile: e.target.value })
                  }
                  className="rounded border-2 border-gray-300 w-64 py-1 px-2"
                />
              </div>
              <button
                className="bg-blue-500 rounded w-fit px-3 py-2 text-white"
                type="submit"
              >
                Update User
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
