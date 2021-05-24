import React from 'react'

const Tools = ({handleToolsAction, action}) => {
    return (
        <div className="tools">
            <div 
                className={"tools__btn " + (action === 'default' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('default')
                }}
            >
                <span className="tools__text"><i className="fas fa-mouse-pointer"></i>  Select</span>

            </div>
            
            <div 
                className={"tools__btn " + (action === 'adding-vertex' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('adding-vertex')
                }}
            >
                 <span className="tools__text"><i className="fas fa-plus"></i>  Vertex</span>

            </div>
            <div 
                className={"tools__btn " + (action === 'adding-edge' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('adding-edge')
                }}
            >
                <span className="tools__text"><i className="fas fa-plus"></i>  Edge</span>

            </div>
            <div 
                className={"tools__btn " + (action === 'removing' ? "is-active" : "")}
                onClick={()=>{
                    handleToolsAction('removing')
                }}
            >
                <span className="tools__text"><i className="fas fa-minus-circle"></i>  Delete</span>

            </div>
            <div 
                className="tools__btn "
                onClick={()=>{
                    handleToolsAction('removing-all')
                }}
            >
                <span className="tools__text"><i className="fas fa-trash-alt"></i>  Delete All</span>

            </div>
            <div className="tools__dropdown tools__btn">
                <span className="tools__text">
                    <i className="fas fa-calculator"></i>  Algorithm
                </span>
                <div className="tools__dropdown__content">
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('start-DFS')
                        }}
                    >
                        <span>DFS</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('start-BFS')
                        }}
                    >
                        <span>BFS</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('count-CC')
                        }}
                    >
                        <span>Count Connected Component</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('start-SP')
                        }}
                    >
                        <span>Shortest Path</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('start-MST')
                        }}
                    >
                       <span> Minimum Spanning Tree</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('get-distance-matrix')
                        }}
                    >
                       <span> Get Distance Matrix</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('euler-trail')
                        }}
                    >
                       <span> Euler Trail</span>
                    </div>
                    <div 
                        className="tools__btn"
                        onClick={()=>{
                            handleToolsAction('hamilton-trail')
                        }}
                    >
                       <span> Hamilton Trail</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tools
