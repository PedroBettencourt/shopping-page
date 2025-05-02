import { useOutletContext } from "react-router-dom";

function Bag() {

    const data = useOutletContext();
    const [bag, setBag] = data.slice(0, 2);
    console.log(bag)

    return (
        <div>
            <h1>Bag</h1>
            {bag.map(product => <h1>{product.id.name} : {product.quantity}</h1>)}
        </div>
    )
}

export default Bag;