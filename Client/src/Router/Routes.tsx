import { createBrowserRouter, Navigate } from "react-router";
import App from "../Layout/App";
import HomePage from "../Features/HomePage";
import AboutPage from "../Features/AboutPage";
import ContactPage from "../Features/ContactPage";
import CatalogPage from "../Features/Catalog/CatalagPage";
import ProductDetailsPage from "../Features/Catalog/ProductDetails";
import ErrorPage from "../Features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCardPage from "../Features/Card/ShoppingCardPage";
import LoginPage from "../Features/Account/LoginPage";
import RegisterPage from "../Features/Account/RegisterPage";

export const  router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage/>},
            {path: "about", element: <AboutPage/>},
            {path: "contact", element: <ContactPage/>},
            {path: "catalog", element: <CatalogPage/>},
            {path: "catalog/:id", element: <ProductDetailsPage/>},
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "card", element: <ShoppingCardPage/>},
            {path: "error", element: <ErrorPage/>},
            {path: "server-error", element: <ServerError/>},
            {path: "not-found", element: <NotFound/>},
            {path: "*", element: <Navigate to="/not-found"/>},
        ]
    }
])

