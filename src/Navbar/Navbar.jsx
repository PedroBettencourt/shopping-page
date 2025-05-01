import { Link, Outlet } from "react-router-dom";
import { bar, title, bag, items } from "./Navbar.module.css";

function Navbar() {
    return (
        <>
            <nav>
                <ul className={bar}>
                    <Link to={"/"} className={title}>Folhado</Link>
                    <div className={items}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"shop"}>Shop</Link>
                    </div>
                    <Link to={"/bag"} className={bag}>Bag</Link>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;