import { createBrowserRouter, Navigate } from "react-router";
import App from "../Components/App";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import ContactPage from "../Pages/ContactPage";
import CatalogPage from "../Pages/Catalog/CatalagPage";
import ProductDetailsPage from "../Pages/Catalog/ProductDetails";
import ErrorPage from "../Pages/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCardPage from "../Pages/Card/ShoppingCardPage";

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
            {path: "card", element: <ShoppingCardPage/>},
            {path: "error", element: <ErrorPage/>},
            {path: "server-error", element: <ServerError/>},
            {path: "not-found", element: <NotFound/>},
            {path: "*", element: <Navigate to="/not-found"/>},
        ]
    }
])

