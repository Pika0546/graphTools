import React from 'react'
import defaultImg from '../img/default.png';
import vertexImg from '../img/point.png';
import edgeImg from '../img/edge.png';
import removeImg from '../img/remove.png';
import clearImg from '../img/clear.png';
import calculatingImg from '../img/calculating.png';

const Tools = ({handleToolsAction, action}) => {
    return (
        <div className="tools">
            <div 
                className={"tools__btn " + (action === 'default' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('default')
                }}
            >
                <span className="tools__text">Default</span>
                <img 
                    className="tools__icon"
                    alt="tools-icon" 
                    src={defaultImg}
                ></img>
            </div>
            <div 
                className={"tools__btn " + (action === 'adding-vertex' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('adding-vertex')
                }}
            >
                 <span className="tools__text"> Add Vertex</span>
                 <img 
                    className="tools__icon"
                    alt="tools-icon" 
                    src={vertexImg}
                ></img>
            </div>
            <div 
                className={"tools__btn " + (action === 'adding-edge' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('adding-edge')
                }}
            >
                <span className="tools__text">Add Edge</span>
                <img 
                    className="tools__icon"
                    alt="tools-icon" 
                    src={edgeImg}
                ></img>
            </div>
            <div 
                className={"tools__btn " + (action === 'removing' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('removing')
                }}
            >
                <span className="tools__text">  Remove</span>
                <img 
                    className="tools__icon"
                    alt="tools-icon" 
                    src={removeImg}
                ></img>
            </div>
            <div 
                className="tools__btn "
                onClick={()=>{
                    handleToolsAction('removing-all')
                }}
            >
                <span className="tools__text">  Remove All</span>
                <img 
                    className="tools__icon"
                    alt="tools-icon" 
                    src={clearImg}
                ></img>
            </div>
            <div className="tools__dropdown tools__btn">
                <span className="tools__text">
                    Algorithm
                </span>
                <img 
                    className="tools__icon"
                    alt="tools-icon" 
                    src={calculatingImg}
                ></img>
                <div className="tools__dropdown__content">
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('calculating')
                        }}
                    >
                        <span>Shortest Path</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('calculating')
                        }}
                    >
                       <span> Minimum Spanning Tree</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tools