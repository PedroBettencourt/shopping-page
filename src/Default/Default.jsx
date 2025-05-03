import { Link } from "react-router-dom";
import {title} from "./Default.module.css"

function Default() {
    return (
        <div>
            <h1 className={title}>Page does not exist!</h1>
            <Link to="/" className={title}>Home Page</Link>
        </div>
    )
}

export default Default;