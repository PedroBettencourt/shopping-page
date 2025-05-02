import { Link } from "react-router-dom";
import { title, loadingClass, errorClass, cards, card, link } from "./Shop.module.css";
import { useEffect, useState } from "react";

function Shop({ items, error, loading }) {

    const [food, setFood] = useState(items);

    useEffect(() => {
        setFood(items);
    }, [items])

    return(
        <div>
            <h1 className={title}>Items ({food.length})</h1>
            {
                (loading) 
                ? <div className={loadingClass}>Loading...</div>
                : (error)
                ? <div className={errorClass}>{error}</div>
                : <ul className={cards}>
                    {food.map((item) => 
                        <Link key={item.id} to={item.id} className={card} >
                            <img src={item.img} alt={item.name} />
                            <div className={link}>{item.name}</div>
                        </Link>
                    )}
                </ul>
            }
        </div>
    );
}

export default Shop;