import { useOutletContext } from "react-router-dom";
import { itemsClass, contentClass, totalClass, card, quantityClass, buttonClass } from "./Bag.module.css";

function Bag() {

    const data = useOutletContext();
    const [bag, setBag] = data.slice(0, 2);

    // Get all total values for each item and then add them together
    let totalPrice;
    if (bag.length === 0) totalPrice = 0;
    else {
        totalPrice = bag.map(item => Math.round(parseFloat(item.product.price.slice(1)) * item.quantity * 100) / 100);
        if (totalPrice.length !== 0) totalPrice = Math.round(totalPrice.reduce((acc, next) => acc + next, 0) * 100) / 100;
    }

    function addQuantity(product) {
        const newBag = bag.map(item => {
            if (item === product) item.quantity++;
            
            return item;
        });
        setBag(newBag)
    }

    function removeQuantity(product) {
        const newBag = bag.map(item => {
            if (item === product) {
                item.quantity--;
            }
            return item;
        });
        setBag(newBag)

        newBag.map(item => {
            if (item.quantity === 0) deleteItem(product);
        });
    }

    function deleteItem(product) {
        const newBag = [...bag];
        const index = newBag.indexOf(product);
        newBag.splice(index, 1);
        setBag(newBag);
    }

    return (
        <div className={itemsClass}>
            <h1>Bag</h1>
            {bag.map(item => (
                <div key={item.product.id} className={contentClass}>
                    <div className={card}>
                        <img src={item.product.img} alt="" />
                    </div>
                    <h2>{item.product.name}</h2>
                    <div className={quantityClass}>
                        <button className={buttonClass}onClick={() => addQuantity(item)}>+</button>
                        <h2>{item.quantity}</h2>
                        <button className={buttonClass}onClick={() => removeQuantity(item)}>-</button>
                        <button onClick={() => deleteItem(item)}>Delete</button>
                    </div>
                    <h2>Price: €{Math.round(parseFloat(item.product.price.slice(1)) * item.quantity * 100) / 100}</h2>
                </div>
                ))}
            <div className={totalClass}>Total: €{totalPrice}</div>
        </div>
    )
}

export default Bag;