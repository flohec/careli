import Home from "../pages/Home.jsx";
import Layout from "../pages/Layout.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx";
import LoginTest from "../pages/LoginTest.jsx";

const App = () => (
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<LoginTest />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </UserProvider>
);

export default App;
