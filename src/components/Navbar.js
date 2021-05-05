import React, {useState, useEffect} from 'react'
import homeIcon from '../img/homeIcon1.png'


const Navbar = ({getUserOption}) => {

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
                <div className="brand"
                     onClick={()=>{
                        window.location.reload();
                    }}
                >
                    <img className="logo" src={homeIcon} alt="icon"></img>
                    <span> Graph Tools</span>
                </div>
                <ul className="navbar__list">
                <li  className="navbar__list__item"
                    onClick={()=>{
                        getUserOption('')
                    }}
                >
                        Home
                    </li>
                    <li  className="navbar__list__item"
                        onClick={()=>{
                            getUserOption(1)
                        }}
                    >
                        Matrix
                    </li>
                   
                    <li  
                        className="navbar__list__item"
                        onClick={()=>{
                            getUserOption(2)
                        }}
                    >
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
                    <li 
                        className="menu__content__item"
                        onClick={()=>{
                            getUserOption('');
                            setOpenMenu(false);
                        }}
                    >
                        <span> Home </span>
                    </li>
                    <li  
                        className="menu__content__item"
                        onClick={()=>{
                            getUserOption(1);
                            setOpenMenu(false);
                        }}
                    >
                        <span>Matrix</span>
                    </li >
                    <li  
                        className="menu__content__item"
                        onClick={()=>{
                            getUserOption(2);
                            setOpenMenu(false);
                        }}
                    >
                        <span> Contact us</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar
