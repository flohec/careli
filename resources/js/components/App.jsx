import Home from "../pages/Home.jsx";
import Layout from "../pages/Layout.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx";
import Admin from "../pages/admin/Admin.jsx";
import UserManagement from "../pages/admin/UserManagement.jsx";
import CompanyManagement from "../pages/admin/CompanyManagement.jsx";
import ArticleManagement from "../pages/admin/ArticleManagement.jsx";

const App = () => (
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="admin" element={<Admin />} />
                        <Route path="admin/users" element={<UserManagement />} />
                        <Route path="admin/companies" element={<CompanyManagement />} />
                        <Route path="admin/articles" element={<ArticleManagement />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </UserProvider>
);

export default App;
