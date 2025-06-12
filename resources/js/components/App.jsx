import Home from "../pages/Home.jsx";
import Layout from "../pages/Layout.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx";
import Admin from "../pages/admin/Admin.jsx";
import UserManagement from "../pages/admin/UserManagement.jsx";
import CompanyManagement from "../pages/admin/CompanyManagement.jsx";
import ArticleManagement from "../pages/admin/ArticleManagement.jsx";
import FooterLinksPage from "../pages/FooterLinksPage.jsx";
import Shop from "../pages/shop/Shop.jsx";

const App = () => (
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    {/* Admin Routes */}
                    <Route path="admin" element={<Admin />} />
                        <Route path="admin/users" element={<UserManagement />} />
                        <Route path="admin/companies" element={<CompanyManagement />} />
                        <Route path="admin/articles" element={<ArticleManagement />} />
                    {/* Shop Routes */}
                    <Route path="shop" element={<Shop />} />

                    {/* Footer Links */}
                    <Route path="imprint" element={<FooterLinksPage type="Impressum" />} />
                    <Route path="privacy-policy" element={<FooterLinksPage type="Datenschutzerklärung" />} />
                    <Route path="terms-of-use" element={<FooterLinksPage type="Allgemeine Geschäftsbedingungen" downloadable={true} />} />
                    <Route path="cookies" element={<h1>About Page</h1>} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </UserProvider>
);

export default App;
