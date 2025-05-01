import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadingClass, errorClass } from "./Shop.module.css";

function Shop() {

    const [food, setFood] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const foodIds = [5020364010151, 5018374285577, 5010044002552, 3228857000166, 
                    3760049791006, 7311070032611, 3228857002245, 5010044002378];
    
    //const foodIds = [5020364010151, 5018374285577];

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

        // let promises = [];
        // for (let item of foodIds) {
        //     promises.push(fetch(`https://world.openfoodfacts.net/api/v2/product/${item}`));
        // }
        // Promise.all(promises).then(result => console.log(result))


        fetchData();
        
    }, []) 

    return(
        <div className="shop">
            <h1>Shop</h1>
            {loading && (<div className={loadingClass}>Loading post</div>)}
            {error && (<div className={errorClass}>{error}</div>)}
            <ul>
                {food.map((item) => 
                    <li key={item.id}>
                        <Link to={item.name}>{item.name}</Link>
                        <img src={item.img} alt={item.name} />
                    </li>)}
            </ul>
        </div>
    )
}

export default Shop;