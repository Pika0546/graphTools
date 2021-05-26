import React from 'react'
import homeIcon from '../img/home.png'

import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <section className="intro">
            <div className="intro__content">
                <h1>Hello</h1>
                <div className="welcome">
                    <p>Welcome to</p>
                    <span className="brand">
                        <img className="logo" src={homeIcon} alt="icon"></img>
                        <span> Graph Tools</span>
                    </span>
                </div>
                <p className="intro__paragraph">
                    This website provides a number of tools for working with Graph Structure.
                    <br></br>
                    It supports some common algorithms such as find Mimimum Spanning Tree(MST), Shortest Path, Euler Circuit...
                </p>
                <p  className="intro__paragraph">Create a graph now !</p>
                <div className="intro__content__buttons">
                    <Link to='/main/1'>
                        <button className="btn">
                            Create by Matrix
                        </button>
                    </Link>
                    <Link to='/main/0'> 
                        <button className="btn">
                            Draw by Hand
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Intro
