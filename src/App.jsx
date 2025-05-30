import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar/Navbar"; 
import Home from "./Home/Home";
import Shop from "./Shop/Shop";
import Bag from "./Bag/Bag";
import "./index.css"
import Product from "./Product/Product";
import Default from "./Default/Default";

function App() {

    const router = createBrowserRouter([
        {path: "/", element: <Navbar />, children: [
          {path: "/", element: <Home />},
          {path: "/shop", element: <Shop />},
          {path: "/shop/:product", element: <Product />},
          {path: "/bag", element: <Bag />},
          {path: "*", element: <Default />},
        ]},
    ]);

    return (
        <RouterProvider router={router} />
    )
}



export default App;