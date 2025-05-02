import { Link } from "react-router-dom";
import { title, loadingClass, errorClass, cards, card, link } from "./Shop.module.css";
import { useOutletContext } from "react-router-dom";

function Shop() {

    const data = useOutletContext();
    const [food, error, loading] = data.slice(2,);

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
                            <div className={link}>{item.price}</div>
                        </Link>
                    )}
                </ul>
            }
        </div>
    );
}

export default Shop;