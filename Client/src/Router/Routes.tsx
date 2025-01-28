import { createBrowserRouter } from "react-router";
import App from "../Components/App";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import ContactPage from "../Pages/ContactPage";
import CatalogPage from "../Pages/Catalog/CatalagPage";
import ProductDetailsPage from "../Pages/Catalog/ProductDetails";

export const  router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage/>},
            {path: "about", element: <AboutPage/>},
            {path: "contact", element: <ContactPage/>},
            {path: "catalog", element: <CatalogPage/>},
            {path: "catalog/:id", element: <ProductDetailsPage/>}
        ]
    }
])

