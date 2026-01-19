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
      <div className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Music Studio</h2>

          {/* PROFILE */}
          <div className="mb-6 bg-gray-800 p-3 rounded">
            <p className="text-sm text-gray-400">Profile</p>
            <p className="font-semibold">
              Hi, {currentUser?.name || "User"}
            </p>
          </div>

          {/* NAV TABS */}
          <nav className="space-y-3 sidebar">
            <NavLink
              to="/library/upload"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              Upload
            </NavLink>

            <NavLink
              to="/library/mymusics"
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              My Musics
            </NavLink>

            <button
              onClick={() => navigate("/")}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-800"
            >
              Back to Home
            </button>
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
