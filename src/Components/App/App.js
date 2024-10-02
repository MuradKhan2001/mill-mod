import React, {useState, createContext} from "react";
import {Routes, Route} from "react-router-dom";
import {RotesProject} from "../../routes/Routes";
import NotFound from "../NotFound/NotFound";


export const MyContext = createContext();

function App() {
    const [url, setUrl] = useState('https://api.leaderautoship.com/api/');
    return (
        <>
            <MyContext.Provider value={{
                url
            }}>
                <Routes>
                    {
                        RotesProject.map((route, index) => (
                            <Route key={index} {...route} />
                        ))
                    }
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </MyContext.Provider>
        </>
    );
}

export default App;