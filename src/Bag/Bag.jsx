function Bag({ bag, setBag }) {

    console.log(bag)

    return (
        <div>
            <h1>Bag</h1>
            {bag.map(product => <h1>{product.id} : {product.quantity}</h1>)}
        </div>
    )
}

export default Bag;