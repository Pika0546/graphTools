import React from 'react'

const Contact = () => {
    return (
        <div className="contact">
            <div className="contact__header">
                <h1>Contact Us</h1>
            </div>
         
                <form className="contact__form">
                    <div className="contact__form__group">
                        <label>Name: </label>
                        <input type="text" name="name" placeholder="name" autoComplete="off"></input>
                    </div>
                    <div className="contact__form__group">
                        <label>Email: </label>
                        <input type="text" name="email" placeholder="email"  autoComplete="off"></input>
                    </div>
                    <div className="contact__form__group">
                        <label>Subject: </label>
                        <input type="text" name="subject" placeholder="subject"  autoComplete="off"></input>
                    </div>
                    <div className="contact__form__group">
                        <label>Message: </label>
                        <textarea cols="40" rows="5"  autoComplete="off"></textarea>
                    </div>
                    <div className="contact__form__group">
                       <button type="reset">Reset</button>
                       <button type="submit">Send</button>
                    </div>
                </form>
        </div>
    )
}

export default Contact
