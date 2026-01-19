import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

import PrivateRoute from "../components/PrivateRoute";
import LibraryLayout from "../Layout/LibraryLayout";
import UploadPage from "../Pages/UploadPage";
import MyMusics from "../Pages/MyMusic";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // 🔹 LIBRARY LAYOUT ROUTE (SIDEBAR + OUTLET)
  {
    path: "/library",
    element: (
      <PrivateRoute>
        <LibraryLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "mymusics",
        element: <MyMusics />,
      }
    ],
  },

]);

export default Router;
