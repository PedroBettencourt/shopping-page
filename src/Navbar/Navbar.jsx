import { Link, Outlet } from "react-router-dom";
import { barClass, titleClass, bagClass, itemsClass } from "./Navbar.module.css";
import { useState, useEffect } from "react";

function Navbar() {

    // Bag checkout
    const [bag, setBag] = useState([]);

    // Shop items
    const [food, setFood] = useState([{id: 5018374285577, name: "", price: ""}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const foodIds = [{id: "5020364010151", price: "€1.30"}, {id: "5018374285577", price: "€0.80"}, {id: "5010044002552", price: "€1.50"}, 
                     {id: "3228857000166", price: "€1.35"}, {id: "5010044002378", price: "€1.10"}, {id: "7311070032611", price: "€0.95"}, 
                     {id: "3495566827654", price: "€1.70"}, {id: "3760049791006", price: "€1.15"}, {id: "5099077004238", price: "€0.65"}];


    let bagSize;
    if (bag.length !== 0) {
        bagSize = bag.reduce((acc, next) => (acc + parseInt(next.quantity)), 0);
    } else {
        bagSize = 0;
    }
    

    useEffect(() => {
        const fetchData = async() => {
            const items = [];
            try {
                for (const item of foodIds) {
                    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${item.id}`);
    
                    if (!response.ok) throw new Error(`HTTP Error: Status ${response.status}`);
    
                    const data = await response.json();
                    
                    const name = data.product.product_name_en;
                    const img = data.product.image_url;
                    
                    items.push({id: item.id, name: name, img: img, price: item.price});
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
                <Link to={"/bag"} className={bagClass}>
                    Bag ({bagSize})
                </Link>
                
            </nav>
        <Outlet context={[bag, setBag, food, error, loading]}/>
        </>
    )
}

export default Navbar;