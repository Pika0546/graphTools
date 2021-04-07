import React from 'react'

const Copyright = () => {

    let currentYear = new Date().getFullYear();

    return (
        <div className="copyright__container">
            <p>Copyright &copy; {currentYear}</p>
        </div>
    )
}

export default Copyright
