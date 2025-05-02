import { useOutletContext } from "react-router-dom";
import { itemClass, totalClass } from "./Bag.module.css";

function Bag() {

    const data = useOutletContext();
    const [bag, setBag] = data.slice(0, 2);

    let totalPrice = bag.map(item => Math.round(parseFloat(item.product.price.slice(1)) * item.quantity * 100) / 100);
    if (totalPrice.length !== 0) totalPrice = totalPrice.reduce((acc, next) => acc += next);

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
        <div>
            <h1>Bag</h1>
            {bag.map(item => (
                <div key={item.product.id} className={itemClass}>
                    <img src={item.product.img} alt="" />
                    <h2>{item.product.name}</h2>
                    <button onClick={() => addQuantity(item)}>+</button>
                    <h2>{item.quantity}</h2>
                    <button onClick={() => removeQuantity(item)}>-</button>
                    <button onClick={() => deleteItem(item)}>Delete</button>
                    <h2>{Math.round(parseFloat(item.product.price.slice(1)) * item.quantity * 100) / 100}</h2>
                </div>
                ))}
            <div className={totalClass}>Total: €{totalPrice}</div>
        </div>
    )
}

export default Bag;