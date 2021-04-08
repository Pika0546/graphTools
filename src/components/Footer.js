import React from 'react'
import homeIcon from '../img/homeIcon1.png'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__content">
                <div className="footer__left">
                    <div className="brand">
                        <img className="logo" src={homeIcon} alt="icon"></img>
                        <span> Graph Tools</span>
                    </div>
                    <p>&copy; Graph Tools is online project aimed at creation and easy visualization of graph and related algorithms.</p>
                    <p>Create a graph: </p>
                    <button>Adjency Matrix</button>
                    
                    <button>Draw by hand</button>

                </div>
             
                <div className="footer__right">
                   
                    <div className="footer__right__content">
                        <p>View <span>Source Code</span></p>
                        <p>Author: Le Tran Dang Khoa - Website: <span>Visit</span></p>
                        <p>Adress: Dong Hoa, Di An, Binh Duong, Vietnam</p>
                        <p>Phone: 0342897xxx - Email: dangkhoa.it.23@gmail.com</p>
                        <p>2021 - {new Date().getFullYear()} </p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
