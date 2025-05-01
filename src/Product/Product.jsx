import { useState } from "react";
import { useParams } from "react-router-dom";

function Product({ bag, setBag }) {

    const {product} = useParams();
    const [quantity, setQuantity] = useState(1);

    function handleChange(e) {
        const value = e.target.value;
        if (value < 1) return;
        setQuantity(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const found = bag.find((item) => item.id === product);
        if (found) {
            const newBag = bag.map((item) => {
                if (item.id === product) {
                    item.quantity = parseInt(item.quantity) + parseInt(quantity);
                };
                return item;
            })
            setBag(newBag);

        } else {
            setBag([...bag, {id: product, quantity: quantity}])
        }

        
    }

    return (
        <div>
            <img src="" alt={product} />
            <h1>{product}</h1>
            <p>Description...</p>
            <h2>Price..</h2>
            <form>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" onChange={handleChange} value={quantity} />
                <button type="submit" onClick={handleSubmit}>Add to Cart</button>
            </form>
        </div>
    )
}

export default Product;