import { useNavigate } from "react-router-dom";
import UploadUsers from "../components/UploadUser";
import UserList from "../components/UserList";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold text-blue-800">
        Welcome to User Management
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-2 py-2 w-fit rounded-md"
      >
        Logout
      </button>
      <UploadUsers />
      <UserList />
    </div>
  );
};

export default Home;
