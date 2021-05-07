import React,{useState, useEffect, useReducer} from 'react'
import Tools from './Tools.js'
import EdgeForm from './EdgeForm'
import Instruction from './Instruction'
import {reducer} from '../reducer'

const vertexSize = 30;

const defaultState = {
    matrix: [],
    vertexList: [],
    edgeList: [],
    tempEdge: [],
    isDirected: -1,
    openEdgeForm: false,
    instructionMess: "",
}

/* Vertex: {x, y, value, status} 
    edge: {vertex1, vertex2, length, angle, id, weight, dir, startX, startY}
*/

const Canvas = ({matrix}) => {

    const [action, setAction] = useState("default");
    const [state, dispatch] = useReducer(reducer, defaultState)

    const handleToolsAction = (ac) =>{
        if(ac === 'removing-all'){
            dispatch({type: "REMOVE_ALL"});
            setAction("default");
        }
        else{
            if(ac === 'adding-vertex'){
                dispatch({type: "START_ADD_VERTEX"});
            }
            else if(ac === 'adding-edge'){
                dispatch({type: "START_ADD_EDGE"});
            }
            else if(ac === 'removing'){
                dispatch({type: "START_REMOVING"});
            }
            else if(ac === 'default'){
                dispatch({type: "DEFAULT"});
            }
            else if(ac ==='start-SP'){
                dispatch({type: 'START_FIND_SP'});
            }
            else if(ac === 'start-MST'){
                dispatch({type: 'START_FIND_MST'});
            }
            else if(ac === 'start-DFS'){
                dispatch({type: 'START_DFS'});
            }
            else if(ac === 'start-BFS'){
                dispatch({type: 'START_BFS'});
            }
            else if(ac === 'count-CC'){
                dispatch({type: 'COUNT_CC'});
            }
            else if(ac === 'get-distance-matrix'){
                dispatch({type: 'GET_DISTANCE_MATRIX'});
            }
            else if(ac === 'euler-trail'){
                dispatch({type: 'EULER_TRAIL'});
            }else if(ac === 'hamilton-trail'){
                dispatch({type: 'HAMILTON_TRAIL'});
            }
            setAction(ac);
            
        }

    }

  
    // useEffect(() => {
    //     if(action !=)
    //     dispatch({type: "CLEAR_TEMP"})
    // }, [action])

    useEffect(()=>{
        if(matrix && matrix.length !== 0){
            dispatch({type: "DRAW_FULL_GRAPH", payload:matrix})
        }
    },[matrix])

    const handleClickOnCanvas = (event)=>{
        if(action === 'adding-vertex'){
            let x = event.clientX;
            let y = event.clientY;
            let value = state.matrix.length + 1;
            dispatch({type: "ADD_VERTEX", payload: {x, y, value}})
        }
    }

    const handleClickOnVertex = (vertex) =>{
        if(action === 'adding-edge'){
            let temp = state.tempEdge.slice(0);
            
            if(temp.length  < 1){
                dispatch({type: "ADD_1_VERTEX_TO_EDGE", payload: vertex})
            }
            else{
                let vertex1 = temp[0];
                let vertex2 = vertex;
                let message = "You can't draw an edge connect a vertex to itself"
                if(vertex1.value === vertex2.value){
                    dispatch({type: 'DUPLICATE_VERTEX', payload: {vertex, message}})
                }else{
                    dispatch({type: 'OPEN_EDGE_FORM' , payload: vertex})
                }
            }
        }else if(action === 'removing'){
            dispatch({type: "REMOVE_VERTEX", payload: vertex})
        }
        else if(action === 'start-SP'){
            let temp = state.tempEdge.slice(0);
            if(temp.length < 1){
                dispatch({type: "ADD_1_VERTEX_TO_TEMP", payload: vertex})
            }
            else{
                let vertex1 = temp[0]
                let vertex2 = vertex;
                let message = "The shortest path from a vertex to itself have weigth = 0"
                if(vertex1.value === vertex2.value){
                    dispatch({type: 'DUPLICATE_VERTEX', payload: {vertex, message}})
                }else{
                    dispatch({type: 'FIND_SP' , payload: vertex})
                }
            }
        }
        else if(action === 'start-DFS'){
            dispatch({type: 'DFS', payload: vertex});
        }else if(action === 'start-BFS'){
            dispatch({type: 'BFS', payload: vertex});
        }
    }

    const handleClickOnEdge = (edge) => {
        if(action === 'removing'){
            dispatch({type: "REMOVE_EDGE", payload: edge})

        }
    }

    const addEdge = (weight, dir) =>{
        dispatch({type: "ADD_EDGE", payload: {weight, dir}})
    }
    
    const closeEdgeForm = () => {
        dispatch({type: "CLOSE_EDGE_FORM"});
    }

    return (
        <section className="main">
            <Tools handleToolsAction={handleToolsAction} action={action}></Tools>
            
           {state.openEdgeForm ? 
                 <EdgeForm 
                    tempEdge={state.tempEdge} 
                    isDirected={state.isDirected}
                    addEdge={addEdge}
                    closeEdgeForm={closeEdgeForm}
                ></EdgeForm> : ""
            }
            
            <section className={"canvas is-"+ action } id="canvas-container">
                <div 
                    className="canvas__area"
                    id="canvas"
                    onClick={handleClickOnCanvas}
                >
                    {state.vertexList.map((item)=>{
                        // let colorCode = {};
                        // if(item.status.indexOf("CC") !== -1){

                        // }

                        return   <div
                                    className={"vertex " + item.status}
                                    style={{
                                            top: item.y - vertexSize/2 + 'px', 
                                            left: item.x - vertexSize/2 + 'px'
                                        }}
                                    key={item.value}
                                    onClick={()=>{
                                        handleClickOnVertex(item)
                                    }}
                                   
                                >
                                    <span>{item.value}</span>
                                </div>
                    })}
                    {state.edgeList.map((item)=>{
    
                        let arrow = "";
                        if(item.vertex1.x > item.vertex2.x){
                            arrow = <i className="fas fa-caret-left"></i>
                        }
                        else if(item.vertex1.x < item.vertex2.x ){
                            arrow =  <i className="fas fa-caret-right"></i>
                        }
                        else if(item.vertex1.y < item.vertex2.y){
                            arrow =  <i className="fas fa-caret-right"></i>
                        }
                        else {
                            arrow =  <i className="fas fa-caret-right"></i>
                        }
                        


                        return   <div
                                    className={"edge " + item.status}
                                    style={{
                                        width: item.length + 'px',
                                        top: item.startY + 'px', 
                                        left: item.startX + 'px', 
                                        transform: "rotate("+ (item.angle)+"deg)",
                                        transformOrigin: "top left",
                                    }}
                                    key={item.id}
                                    onClick={()=>{
                                        handleClickOnEdge(item);
                                    }}
                                >
                                   {state.isDirected === 1 ? arrow : ""}
                                  {item.weight !== 0 ? <span>{item.weight} </span>: ""}
                                </div>
                    })}
                </div>
            </section>
            
            <Instruction message={state.instructionMess}></Instruction>

        </section>
    )
}

export default Canvas
