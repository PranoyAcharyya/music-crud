import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Landing() {
  const navigate = useNavigate();
 const isAuth = useSelector((state) => state.auth.isAuthenticated);
 console.log(isAuth);
 
  return (
    <div className="bg-gradient-to-b from-black via-[#0b3a1f] to-[#1db9547a] text-white min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">
        Stream. Organize. Enjoy.
      </h1>

      <p className="text-gray-400 max-w-xl mb-6">
        Your personal music library with a modern Spotify-like experience.
        Upload, manage, and play your music seamlessly.
      </p>

      <div className="space-x-4">

    {!isAuth && <button
          onClick={() => navigate("/login")}
          className="bg-green-500 px-6 py-3 rounded-lg text-black font-bold"
        >
          Login to Upload
        </button>}
        

        <button
          onClick={() => navigate("/library/mymusics")}
          className="bg-gray-800 px-6 py-3 rounded-lg"
        >
          Open Libary
        </button>
      </div>
    </div>
  );
}
