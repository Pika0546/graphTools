import React from 'react'
import homeIcon from '../img/homeIcon1.png'
const Intro = ({getUserOption}) => {
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
                    It supports some common algorithms such as find the Mimimum Spanning Tree(MST), the Shortest Path, Euler Circuit...
                </p>
                <p  className="intro__paragraph">Create a graph now !</p>
                <div className="intro__content__buttons">
                    <button 
                        className="btn"
                        onClick={()=>{
                            getUserOption(1)
                        }}
                    >
                        Adjacency Matrix
                    </button>
                  
                    <button 
                        className="btn"
                        onClick={()=>{
                            getUserOption(0)
                        }}
                    >
                        Draw by Hand
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Intro
