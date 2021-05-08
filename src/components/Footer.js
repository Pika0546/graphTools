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
                    

                </div>
                <div className="footer__right">
                   
                    <div className="footer__right__content">
                        {/* <p>View <span>Source Code</span></p> */}
                        <p>Author: Le Tran Dang Khoa - Website: <a href="https://pika0546.github.io/le-tran-dang-khoa">Visit</a></p>
                        <p>Address: Dong Hoa, Di An, Binh Duong, Vietnam</p>
                        <p>Phone: 0342897441- Email: dangkhoa.it.23@gmail.com</p>
                        <p>2021 - {new Date().getFullYear()} </p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
