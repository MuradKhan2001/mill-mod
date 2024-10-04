import React from 'react';
import ReactDOM from 'react-dom/client';
import "./global.scss"
import {BrowserRouter as Router} from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import i18next from "i18next";
import "aos/dist/aos.css";
import {initReactI18next} from "react-i18next";
import uz from "./languages/uz/uz.json";
import ru from "./languages/ru/ru.json";
import en from "./languages/en/en.json";


const App = React.lazy(() => import('./Components/App/App'));

i18next.use(initReactI18next).init({
    resources: {
        uz: {
            translation: uz,
        }, ru: {
            translation: ru,
        }, en: {
            translation: en,
        }
    }, lng: localStorage.getItem("lng") || "uz",
});
export default i18next

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <React.Suspense fallback={<Loader/>}>
        <Router>
            <App/>
        </Router>
    </React.Suspense>
</React.StrictMode>);