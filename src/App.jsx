import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar/Navbar"; 
import Home from "./Home/Home";
import Shop from "./Shop/Shop";
import Bag from "./Bag/Bag";
import "./index.css"
import Product from "./Product/Product";

function App() {

    const [bag, setBag] = useState([]);

    const router = createBrowserRouter([
        {path: "/", element: <Navbar />, children: [
          {path: "/", element: <Home />},
          {path: "/shop", element: <Shop />},
          {path: "/shop/:product", element: <Product bag={bag} setBag={setBag}/>},
          {path: "/bag", element: <Bag bag={bag} setBag={setBag}/>},
        ]},
    ]);

    return (
        <RouterProvider router={router} />
    )
}



export default App;