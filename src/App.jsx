import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar/Navbar"; 
import Home from "./Home/Home";
import Shop from "./Shop/Shop";
import Bag from "./Bag/Bag";
import "./index.css"
import Product from "./Product/Product";

function App() {

    // Bag checkout
    const [bag, setBag] = useState([]);

    // Shop items
    const [food, setFood] = useState([{id: 5020364010151, name:""}, {id: 5018374285577, name: ""}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // const foodIds = [5020364010151, 5018374285577, 5010044002552, 3228857000166, 
    //                 3760049791006, 7311070032611, 3228857002245, 5010044002378];

    const foodIds = [5020364010151, 5018374285577,];
    
    useEffect(() => {
        const fetchData = async() => {
            const items = [];
            try {
                for (const item of foodIds) {
                    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${item}`);
    
                    if (!response.ok) throw new Error(`HTTP Error: Status ${response.status}`);
    
                    const data = await response.json();
                    
                    const name = data.product.product_name_en;
                    const img = data.product.image_url;
                    
                    items.push({id: item.toString(), name: name, img: img});
                }
                setFood(items);

            } catch(err) {
                setError(err.message);
                setFood(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
    }, []);

    const router = createBrowserRouter([
        {path: "/", element: <Navbar />, children: [
          {path: "/", element: <Home />},
          {path: "/shop", element: <Shop items={food} error={error} loading={loading} />},
          {path: "/shop/:product", element: <Product food={food} bag={bag} setBag={setBag}/>},
          {path: "/bag", element: <Bag bag={bag} setBag={setBag}/>},
        ]},
    ]);

    return (
        <RouterProvider router={router} />
    )
}



export default App;