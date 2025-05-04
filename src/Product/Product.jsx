import { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { productClass, loadingClass, errorClass } from "./Product.module.css";
import Default from "../Default/Default";


function Product() {

    const data = useOutletContext();
    let [bag, setBag, food, error, loading, foodIds] = [[], null, [], null, true, []];
    if (data) [bag, setBag, food, error, loading, foodIds] = data;
    const [quantity, setQuantity] = useState(1);

    // Get product information
    let {product} = useParams();

    // Check if product is in the foodIds -- send to default page otherwise
    if (!foodIds.find((item) => product === item.id.toString())) return (<Default />);

    product = food.find( item => item.id.toString() === product);
    let productName, productImg, productPrice;
    if (product) {
        productName = product.name;
        productImg = product.img;
        productPrice = product.price;
    }


    function handleChange(e) {
        const value = e.target.value;
        if (value < 1) return;
        setQuantity(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const found = bag.find((item) => item.product.id === product.id);
        if (found) {
            const newBag = bag.map((item) => {
                if (item.product.id === product.id) {
                    item.quantity = parseInt(item.quantity) + parseInt(quantity);
                };
                return item;
            })
            setBag(newBag);

        } else {
            setBag([...bag, {product: product, quantity: quantity}])
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
                    <img src={productImg} alt={productName} />
                    <h1>{productName}</h1>
                    <h2>{productPrice}</h2>
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