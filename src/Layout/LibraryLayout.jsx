import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

export default function LibraryLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.auth.users);
  const currentUserId = useSelector(state => state.auth.currentUserId);

  const currentUser = users.find(u => u.id === currentUserId);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* SIDEBAR */}
      <div className="w-30 sm:w-64 bg-gray-900 p-3 sm:p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 hidden sm:block">
            Music Studio
          </h2>

          {/* PROFILE */}
          <div className="mb-4 sm:mb-6 bg-gray-800 p-2 sm:p-3 rounded text-left sm:text-left">
            <p className="text-xs sm:text-sm text-gray-400">Profile</p>
            <p className="font-semibold text-sm sm:text-base">
              Hi, {currentUser?.name || "User"}
            </p>
          </div>

          {/* NAV TABS */}
          <nav className="space-y-2 sm:space-y-3 sidebar">
            <NavLink
              to="/library/upload"
              className="block text-sm sm:text-base px-2 sm:px-3 py-2 rounded hover:bg-gray-800 text-left sm:text-left"
            >
              Upload
            </NavLink>

            <NavLink
              to="/library/mymusics"
              className="block text-sm sm:text-base px-2 sm:px-3 py-2 rounded hover:bg-gray-800 text-left sm:text-left"
            >
              My Musics
            </NavLink>

            <button
              onClick={() => navigate("/")}
              className="w-full text-left text-sm sm:text-base px-2 sm:px-3 py-2 rounded hover:bg-gray-800"
            >
              Home
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-sm sm:text-base px-3 sm:px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
