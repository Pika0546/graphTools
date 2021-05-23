import React from 'react'
import error from '../img/404.png';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className="error">
            <div className="error__content">
                <div className="error__img">
                    <img src={error} alt="404 Imagae"></img>
                </div>
                <h3>Got lost ?</h3>
                <p>
                    Look like your page had lost connection. Please check the url and try again.
                    <br/> 
                    Or you can try our page, we have an algorithm to find the shortest path to anywhere that ensures you won't get lost again.
                </p>
                <Link to='/'>
                    <button className="btn">
                        Explore our site
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Error
