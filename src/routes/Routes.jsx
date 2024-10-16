import Home from "../Components/Home/Home";
import Contact from "../Components/Contact/Contact";
import AboutProduct from "../Components/AboutProduct/AboutProduct";
import National from "../Components/KatalogProduct/National/National";
import Loader from "../Components/Loader/Loader";
import Promo from "../Components/KatalogProduct/Promo/Promo";
import Modern from "../Components/KatalogProduct/Modern/Modern";

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
        path: "/promo",
        element: <Promo/>
    },
    {
        path: "/modern",
        element: <Modern/>
    },
    {
        path: "/loader",
        element: <Loader/>
    },
];
