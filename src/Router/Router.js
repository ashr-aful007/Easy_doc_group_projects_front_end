import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Home from "../components/Pages/HomePage/Home/Home";
import ViewProfile from "../components/Pages/Profile/ViewProfile/ViewProfile";
import Main from "../Layout/Main";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/profile",
                element: <ViewProfile></ViewProfile>,
            },
        ],
    },
]);

export default routes;
