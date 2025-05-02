import { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { productClass, loadingClass, errorClass } from "./Product.module.css";


function Product() {

    const data = useOutletContext();
    const [bag, setBag, food, loading, error] = data;

    // CHECK IF ITEM PARAM ACTUALLY EXISTS _> SEND STATE WITH THE PRODUCTS

    // Get product information
    let {product} = useParams();
    product = food.find( item => item.id.toString() === product);
    const productName = product.name;
    const productImg = product.img;

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
            {
                (loading) 
                ? <div className={loadingClass}>Loading...</div>
                : (error)
                ? <div className={errorClass}>{error}</div>
                : <div className={productClass}>
                    <h1>{productName}</h1>
                    <img src={productImg} alt={productName} />
                    <h2>Price..</h2>
                    <form>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" name="quantity" id="quantity" onChange={handleChange} value={quantity} />
                        <button type="submit" onClick={handleSubmit}>Add to Cart</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Product;