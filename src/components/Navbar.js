import React, {useState, useEffect} from 'react'
import homeIcon from '../img/homeIcon1.png'


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
                <div className="brand">
                    <img className="logo" src={homeIcon} alt="icon"></img>
                    <span> Graph Tools</span>
                </div>
                <ul className="navbar__list">
                    <li  className="navbar__list__item">
                        Adjacency matrix
                    </li>
                    <li  className="navbar__list__item">
                        Adjacency list
                    </li >
                    <li  className="navbar__list__item">
                        Contact us
                    </li>
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
                        <li className="menu__content__item">
                        <span> Adjacency matrix</span>
                        </li>
                        <li  className="menu__content__item">
                            <span>Adjacency list</span>
                        </li >
                        <li  className="menu__content__item">
                        <span> Contact us</span>
                        </li>
                    </ul>
                </div>
        </>
    )
}

export default Navbar
