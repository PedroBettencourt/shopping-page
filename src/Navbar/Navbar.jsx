import { Link, Outlet } from "react-router-dom";
import { barClass, titleClass, bagClass, itemsClass } from "./Navbar.module.css";
import { useState, useEffect } from "react";

function Navbar() {

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

    return (
        <>
            <nav className={barClass}>
                <Link to={"/"} className={titleClass}>Folhado</Link>
                <div className={itemsClass}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"shop"}>Shop</Link>
                </div>
                <Link to={"/bag"} className={bagClass}>Bag</Link>
            </nav>
        <Outlet context={[bag, setBag, food, error, loading]}/>
        </>
    )
}

export default Navbar;