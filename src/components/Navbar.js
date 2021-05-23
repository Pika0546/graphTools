import React, {useState, useEffect} from 'react'
import homeIcon from '../img/home.png'

import { Link } from 'react-router-dom';
const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const handler = () =>{
        if(window.innerWidth > 767){
            setOpenMenu(false);
        }
        
    }

    useEffect(() => {
        window.addEventListener("resize", handler);
        return () => {
            window.removeEventListener("resize", handler);
        }
    }, [])


    return (
        <>
            <section className="navbar">
                <Link to='/' className="brand">
                    <img className="logo" src={homeIcon} alt="icon"></img>
                    <span> Graph Tools</span>
                </Link>
                <ul className="navbar__list">
                    <Link to='/'>
                        <li className="navbar__list__item">
                            Home
                        </li>
                    </Link>
                    <Link to="/main/1">
                        <li className="navbar__list__item"> 
                            Matrix
                        </li>
                    </Link>
                    <Link to='/contact'> 
                        <li className="navbar__list__item">
                            Contact us
                        </li>
                    </Link>
                </ul>
                <div 
                    className={"navbar__button " + (openMenu? "is-open" : "")} 
                    onClick={()=>{
                        setOpenMenu(!openMenu);
                    }}
                >
                    <span></span>
                </div>
            </section>
            <div className={"menu " + (openMenu ? "is-open" : "") }>
                <ul className="menu__content">
                    <Link to='/'>
                        <li 
                            className="menu__content__item"
                            onClick={()=>{
                                setOpenMenu(false);
                            }}
                        >
                            <span> Home </span>
                        </li>
                    </Link>
                    <Link to='/main/1'>
                        <li  
                            className="menu__content__item"
                            onClick={()=>{
                                setOpenMenu(false);
                            }}
                        >
                            <span>Matrix</span>   
                        </li >
                    </Link>
                    <Link to='/contact'> 
                        <li  
                            className="menu__content__item"
                            onClick={()=>{
                                setOpenMenu(false);
                            }}
                        >
                            <span> Contact us</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    )
}

export default Navbar
