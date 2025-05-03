import { content, title, button, flower, sweet } from "./Home.module.css"
import folhado from "/home/pedro/repos/shopping-page/public/folhado.png";
import cupcake from "/home/pedro/repos/shopping-page/public/cupcake.png";
import { Link } from "react-router-dom";

function Home() {

    return (
        <div className={content}>
            <h1 className={title}>Folhado Bakery</h1>
            <h2>Vegan bakery.</h2>
            <p>Get all the sweet treats without any of the animal exploitation</p>
            <Link to="shop">
                <button className={button}>Shop Now</button>
            </Link>
            <img src={folhado} alt="" className={flower}/>
            <img src={cupcake} alt="" className={sweet}/>
        </div>
    )
}

export default Home;