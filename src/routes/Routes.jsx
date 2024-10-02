import Home from "../Components/Home/Home";
import Contact from "../Components/Contact/Contact";
import AboutProduct from "../Components/AboutProduct/AboutProduct";
import National from "../Components/KatalogProduct/National/National";
import Loader from "../Components/Loader/Loader";

export const RotesProject = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/contact",
        element: <Contact/>
    },
    {
        path: "/about-products",
        element: <AboutProduct/>
    },
    {
        path: "/national",
        element: <National/>
    },
    {
        path: "/loader",
        element: <Loader/>
    },
];
