import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { title, loadingClass, errorClass, cards, card, link } from "./Shop.module.css";

function Shop() {

    const [food, setFood] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const foodIds = [5020364010151, 5018374285577, 5010044002552, 3228857000166, 
                    3760049791006, 7311070032611, 3228857002245, 5010044002378];
    
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
                    
                    items.push({id: item, name: name, img: img});
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
        
    }, []) 

    return(
        <div>
            <h1 className={title}>Items ({food.length})</h1>
            {loading && (<div className={loadingClass}>Loading post</div>)}
            {error && (<div className={errorClass}>{error}</div>)}
            <ul className={cards}>
                {food.map((item) => 
                        <Link key={item.id} to={item.name} className={card}>
                            <img src={item.img} alt={item.name} />
                            <div className={link}>{item.name}</div>
                        </Link>
)}
            </ul>
        </div>
    )
}

export default Shop;