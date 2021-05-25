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
    selectedArea: 
        {
            x: 0,
            y: 0, 
            width: 0, 
            height: 0, 
            isRender: false,
            origin: ["top", "left"]
        },
    instructionMess: "",
}

/* Vertex: {x, y, value, status} 
    edge: {vertex1, vertex2, length, angle, id, weight, dir, startX, startY}
*/

const Canvas = ({matrix}) => {

    const [action, setAction] = useState("default");
    const [state, dispatch] = useReducer(reducer, defaultState)

    const findVertex = (value, vertexList = state.vertexList) => {
        let index = vertexList.findIndex((item) => {
            return item.value === value;
        })
        return index;
    }


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
            }
            else if(ac === 'hamilton-trail'){
                dispatch({type: 'HAMILTON_TRAIL'});
            }
            else if(ac === 'start-move-vertex'){
                dispatch({type: 'START_MOVE_VERTEX'})
            }
            else if(ac === 'start-move-graph'){
                dispatch({type: 'START_MOVE_GRAPH'})
            }
            else if(ac === 'start-move-area'){
                dispatch({type: 'START_MOVE_AREA'})
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

    const closeDragElement = () => {
		document.onmouseup = null;
		document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
	}

	function moveElement(x, y, index, mouse1X, mouse1Y) {
	
        dispatch({type: "MOVE_VERTEX", payload: {x: x - mouse1X, y: y - mouse1Y, index: index}});
	}

    const moveArea = (x, y, index, mouse1X, mouse1Y) => {
        dispatch({type: "MOVE_AREA", payload: {x: x - mouse1X, y: y - mouse1Y, index: index}})
    }

	const dragMouseDown = (e, id) => {
        if(action === "default"){
            e = e || window.event;
            e.stopPropagation()
            e.preventDefault();
            
            let index = findVertex(id);
            let mouse1X = e.clientX - state.vertexList[index].x;
            let mouse1Y = e.clientY - state.vertexList[index].y;
            
            document.onmouseup = (e) => {
                closeDragElement(e);
            }
            if(state.vertexList[index].status === 'is-in-select-to-move'){
                document.onmousemove = (e) => {
                    e = e || window.event;
                    e.preventDefault();
                    moveArea(e.clientX, e.clientY, index, mouse1X, mouse1Y);
                }
            }
            else{
                document.onmousemove = (e) => {
                    e = e || window.event;
                    e.preventDefault();
                    moveElement(e.clientX, e.clientY,  index, mouse1X, mouse1Y);
                }
            }    
        }
	
	}

    const drawArea = (clientX, clientY, x, y, startX, startY) => {
        let dentaX = clientX - startX;
        let dentaY = clientY - startY;
        let origin = ["top", "left"];
        if(dentaX < 0){
            origin[1] = "right";
        }
        if(dentaY < 0){
            origin[0] = 'bottom';
        }
        dispatch({type: "DRAW_SELECTED_AREA", payload: {x: x, y: y, width: Math.abs(dentaX), height: Math.abs(dentaY), origin: origin}})

    }

    const closeDrawArea = (e) => {

        dispatch({type: "CLEAR_AREA"});
        // setAction("start-move-vertex-area")
        document.onmouseup = null;
		document.onmousemove = null;
        document.ontouchmove = null;
        document.ontouchend = null;
    }

    const startSelectArea = (e) => {
        if(action === 'default'){

            e = e || window.event;
            e.preventDefault();
            let myCanvas = document.getElementById("canvas");
            let canvasRect = myCanvas.getBoundingClientRect();
            let x = e.clientX - canvasRect.left;
            let y = e.clientY - canvasRect.top;
            let startX = e.clientX;
            let startY = e.clientY
            document.onmouseup = (e) => {
                closeDrawArea(e);
            }
            document.onmousemove = (e) => {
                e = e || window.event;
                e.preventDefault();
                drawArea(e.clientX, e.clientY, x, y, startX, startY);
            }
        }
        
    }

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

    

    const onTouchVertex = (event, id) => {
        if(action === "default"){
            event = event || window.event;
            event.stopPropagation();
            let index = findVertex(id);
            let mouse1X = event.touches[0].pageX - state.vertexList[index].x;
            let mouse1Y = event.touches[0].pageY - state.vertexList[index].y;
            document.getElementsByTagName("BODY")[0].classList.add("disable-pull-to-refresh");
            const touchMove = (e) => {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                moveElement(e.touches[0].pageX, e.touches[0].pageY, index, mouse1X, mouse1Y);
            }
            
            if(state.vertexList[index].status === 'is-in-select-to-move'){
                document.ontouchmove = (e) => {
                    e = e || window.event;
                    e.stopPropagation();
                    e.preventDefault();
                    moveArea(e.touches[0].pageX,e.touches[0].pageY, index, mouse1X, mouse1Y);
                }
            }
            else{
                // document.ontouchmove = (e) => {
                //     e = e || window.event;
                //     e.stopPropagation();
                //     e.preventDefault();
                //     moveElement(e.touches[0].pageX, e.touches[0].pageY, index, mouse1X, mouse1Y);
                // }

                document.addEventListener("touchmove",touchMove, {passive: false});
            }    
            document.ontouchend = (e,) => {
                document.getElementsByTagName("BODY")[0].classList.remove("disable-pull-to-refresh");

                document.removeEventListener("touchmove", touchMove, {passive: false});
                closeDragElement(e);
            }
        }
    }

    let selectedAreaEle = "";
    if(state.selectedArea.isRender === true){
        let bottom =  (8000 -  state.selectedArea.y);
        let right =(8000 -  state.selectedArea.x);
        if(state.selectedArea.origin[0] === 'top'){
            if(state.selectedArea.origin[1] === 'left'){
                selectedAreaEle =  <div 
                                        className="selected-area"
                                        style={{
                                            top: state.selectedArea.y + 'px', 
                                            left: state.selectedArea.x + 'px',
                                            width: state.selectedArea.width + 'px',
                                            height: state.selectedArea.height + 'px',
                                            transformOrigin: "left top",
                                        }}
                                    ></div>
            }
            else{
              
                selectedAreaEle =  <div 
                                        className="selected-area"
                                        style={{
                                            top: state.selectedArea.y + 'px', 
                                            right: right + 'px',    
                                            width: state.selectedArea.width + 'px',
                                            height: state.selectedArea.height + 'px',
                                            transformOrigin: "right top",
                                        }}
                                    ></div>
            }
        }
        else{
           
            if(state.selectedArea.origin[1] === 'left'){
                selectedAreaEle =  <div 
                                        className="selected-area"
                                        style={{
                                            bottom: bottom + 'px', 
                                            left: state.selectedArea.x + 'px',
                                            width: state.selectedArea.width + 'px',
                                            height: state.selectedArea.height + 'px',
                                            transformOrigin: "left bottom",
                                        }}
                                    ></div>
            }
            else{
                
                selectedAreaEle =  <div 
                                        className="selected-area"
                                        style={{
                                            bottom: bottom + 'px', 
                                            right: right + 'px',
                                            width: state.selectedArea.width + 'px',
                                            height: state.selectedArea.height + 'px',
                                            transformOrigin: "right bottom",
                                        }}
                                    ></div>
            }
        }
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
                    onMouseDown={startSelectArea}
                >
                    {state.vertexList.map((item)=>{
                        return   <div
                                    className={"vertex " + item.status}
                                    style={{
                                            top: item.y - vertexSize/2 + 'px', 
                                            left: item.x - vertexSize/2 + 'px'
                                        }}
                                    key={item.value}
                                    id = {"vertex-" + item.value}
                                    onClick={()=>{
                                        handleClickOnVertex(item)
                                    }}
                                    onMouseDown={(e)=>{
                                        dragMouseDown(e, item.value);
                                    }}
                                    onTouchStart={(e)=>{
                                        onTouchVertex(e, item.value);
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
                    {state.selectedArea.isRender === true ? 
                       selectedAreaEle : ""
                    }
                </div>
            </section>
            
            <Instruction message={state.instructionMess}></Instruction>

        </section>
    )
}

export default Canvas
