export const reducer = (state, action) => {

    const resetTemp = ()=>{
        let temp = state.vertexList;
        let n = temp.length;
        for(let i = 0 ; i < n ; i++){
            if(temp[i].status !== ""){
                temp[i].status = '';
            }
        }
        return temp;
    }

    const calculateEdgeProp = (vertex1, vertex2) => {
        let x1 = vertex1.x;
        let x2 = vertex2.x;
        let y1 = vertex1.y;
        let y2 = vertex2.y;
        if(x1 > x2)
        {
            let temp = x1;
            x1 = x2;
            x2 = temp;
            temp = y1;
            y1 = y2;
            y2 = temp;
        }
       
        let calc = Math.atan((y1 - y2) / (x2 - x1));
        calc = calc * 180 / Math.PI;
        let length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return [length, -calc];
    }

    const isInEdgeList = (vertex1, vertex2, dir, edgeList) =>{
        let n = edgeList.length;
        for(let i = 0 ; i< n ; i++){
            
            if(dir === 0){
                if(edgeList[i].id
                    === vertex1.value.toString() + vertex2.value.toString() 
                ||
                edgeList[i].id
                    === vertex2.value.toString() + vertex1.value.toString() 
             
                ){
                    return i;
                }
            }

            if(edgeList[i].id
                === vertex1.value.toString() + vertex2.value.toString() 
            ){
                return i;
            }
        }
        return -1;
    }

    const findVertex = (value, vertexList = state.vertexList) => {
        let index = vertexList.findIndex((item) => {
            return item.value === value;
        })
        return index;
    }

    const getDistance = (x1, y1, x2, y2) => {
        return (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);
    }

    const rad = (deg) => {
        return deg*Math.PI/180;
    }

    const checkVertex = (x ,y) => {
        const dis = 30;
      
        let n = state.vertexList.length;
        for(let i = 0 ; i < n ; i++){
         
            if(getDistance(x, y, state.vertexList[i].x,state.vertexList[i].y) <= dis*dis){
                return false;
            }
        }
        return true;
    }


	const solveMyMathProblem = (xa, ya, xo, yo, alpha) => {
        console.log(alpha*180/Math.PI)
		let y = (ya - yo)*Math.cos(alpha) + yo;
		let x1 = Math.sqrt((ya - yo) * (ya - yo) - (y - yo)*(y - yo)) + xo;
		let x2 = -Math.sqrt((ya - yo) * (ya - yo) - (y - yo)*(y - yo)) + xo;
		return [x1, y, x2, y];
	}

    const addEdge = (vertex1, vertex2, edgeList, dir, weight) => {
        
        let id = vertex1.value.toString() + vertex2.value.toString();
        let [length, angle] = calculateEdgeProp(vertex1, vertex2);
        let startX = vertex1.x;
        let startY = vertex1.y;
        if(vertex1.x > vertex2.x){
            startX = vertex2.x;
            startY = vertex2.y;
        }
        if(dir !== 0){
            let otherEdgeIndex = isInEdgeList(vertex2, vertex1, dir, edgeList);
                if(otherEdgeIndex !== -1){
                    const R = 15;
                    let dentaX = 0;
                    let dentaY = 0;
                    if(angle < 0){
                        dentaX = R*Math.cos(rad(90+angle));
                        dentaY = R*Math.sin(rad(90+angle));
                        edgeList[otherEdgeIndex].startX = startX + dentaX;
                        edgeList[otherEdgeIndex].startY = startY + dentaY;
                        startX = startX - dentaX;
                        startY = startY - dentaY;
                    }
                    else{
                        dentaY = R*Math.cos(rad(angle));
                        dentaX = R*Math.sin(rad(angle));
                        edgeList[otherEdgeIndex].startX = startX - dentaX;
                        edgeList[otherEdgeIndex].startY = startY + dentaY;
                        startX = startX + dentaX;
                        startY = startY - dentaY;
                    }
                }
        }
        edgeList.push({ vertex1, 
            vertex2, 
            length, 
            angle, 
            id, 
            weight, 
            dir,
            startX,
            startY})
    }

    if(action.type === 'DRAW_FULL_GRAPH'){
        console.log(action.payload);
        let tempMatrix = action.payload;
        const denta =25;
        const size = tempMatrix.length;
        const startVertexX0 = denta*size + 30;
        const startVertexY0 = 50;
        const centerX = startVertexX0;
        const centerY = startVertexY0 + denta*size;
        let tempEdgeList = [];
        let tempVertexList = [];
        tempVertexList.push({x:startVertexX0, y: startVertexY0, value: 1, status: ""});
        for(let i = 2 ;i <= size/2 + 1 ; i ++){
            let [x1, y1, x2, y2] = solveMyMathProblem(startVertexX0, startVertexY0, centerX, centerY, 2 * Math.PI* (i - 1) / size);
            if(i === size + 2 - i){
                tempVertexList.push({x: x1, y: y1, value: i, status: ""});
            }
            else{
                tempVertexList.push({x: x1, y: y1, value: i, status: ""});
                tempVertexList.push({x: x2, y: y2, value: size + 2 - i, status: ""});
            }
        }

        let isDir = 0;
        let isWeight = 0;

        for(let i = 0 ; i < size ; i++){
            for(let j = 0 ; j < size; j++){
               if(!isWeight){
                    if(tempMatrix[i][j] !== 0 && tempMatrix[i][j] !== 1){
                        isWeight = 1;
                    }
               }
               if(!isDir){
                   if(tempMatrix[i][j] !== tempMatrix[j][i]){
                       isDir = 1;
                   }
               }
               if(isDir && isWeight){
                   break;
               }
            }
        }
        console.log(tempVertexList)
        for(let i = 0 ;i < size; i ++){
            for(let j = 0 ; j < size; j++){
                if((isWeight && tempMatrix[i][j] !== 'Inf') || (!isWeight && tempMatrix[i][j] !== 0)){
                    console.log(i, j)
                    let index1 = findVertex(i + 1, tempVertexList);
                    let index2 = findVertex(j + 1, tempVertexList);
                    console.log(index1, index2)
                    addEdge(tempVertexList[index1],tempVertexList[index2],tempEdgeList,  isDir, isWeight ? tempMatrix[i][j] : 0);
                }
            }
        }

        return {
            ...state,
            matrix: tempMatrix,
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            isDirected: isDir
        }
    }

    if(action.type === 'START_ADD_VERTEX'){
        return{
            ...state,
            instructionMess:"Click everywhere on the canvas to draw a vertex"
        }
    }
    if(action.type === 'START_ADD_EDGE'){
        return{
            ...state,
            instructionMess:"Click any two vertices to draw an edge"
        }
    }
    if(action.type === 'START_REMOVING'){
        return{
            ...state,
            instructionMess:"Click on anything to remove it from your graph"
        }
    }


	if (action.type === 'DEFAULT') {
		return {
            ...state,
            vertexList: resetTemp(),
            tempEdge: [],
            instructionMess: "",
        }
	}

    if(action.type === "CLEAR_TEMP"){
        let currentVertex = state.tempEdge[0];
        let tempVertexList = state.vertexList.slice(0);
        tempVertexList[findVertex(currentVertex.value, state.vertexList)].status="";
        return{
            ...state,
            vertexList: tempVertexList,
            tempEdge: [],
            instructionMess: "",
        }

    }

    if(action.type === 'CLOSE_EDGE_FORM'){
        let tempTempEdge = state.tempEdge.slice(0);
        let tempVertexList = state.vertexList.slice(0);
        tempVertexList[findVertex(tempTempEdge[0].value , state.vertexList)].status="";
        tempVertexList[findVertex(tempTempEdge[1].value , state.vertexList)].status="";
        return{
            ...state,
            tempEdge: [], openEdgeForm: false,
            vertexList: tempVertexList,
            instructionMess:"Click any two vertices to draw an edge"
        }
    }

	if (action.type === 'ADD_VERTEX') {
        let {x, y, value} = action.payload;
        const myCanvasContainer = document.getElementById("canvas-container");
        let tempX = x - myCanvasContainer.offsetLeft + myCanvasContainer.scrollLeft;
		let tempY = y - myCanvasContainer.offsetTop + myCanvasContainer.scrollTop ;
        if(!checkVertex(tempX, tempY)){
            return {
                ...state,
            }
        }
        let temp = state.matrix.slice(0);
        let tempRow = [];
        for(let i = 0 ; i < value - 1 ; i++){
            tempRow.push(Infinity);
        }
        temp = [ ...temp, tempRow];
        for(let i = 0; i < value  ; i++){   
            temp[i] = [...temp[i], Infinity];
        }
        let n = temp.length;
        for(let i = 0 ; i < n; i++ ){
            for(let j = 0 ; j < n ; j ++){
                if(i === j){
                    temp[i][j] = 0;
                }
            }
        }

        return {
            ...state,
            matrix: temp,
            vertexList: [...state.vertexList, {x: tempX,y: tempY,value,status: ""}],
        }
    }

    if(action.type === "ADD_1_VERTEX_TO_EDGE"){
        let vertex = action.payload;
        let temp = state.tempEdge.slice(0);
        let tempList = state.vertexList.slice(0);
        temp.push({x: vertex.x, y: vertex.y, value: vertex.value})
        tempList[findVertex(vertex.value)].status="is-selecting";
        return {
            ...state,
            vertexList: tempList,
            tempEdge: temp,
            instructionMess: "Choose another vertex to create an edge !",
        }
    }

    if(action.type === 'DUPLICATE_VERTEX'){
        let tempVertexList = state.vertexList.slice(0)
        let vertex1 = action.payload;
        let vertex2 = state.tempEdge[0];
        tempVertexList[findVertex(vertex1.value)].status = "";
        tempVertexList[findVertex(vertex2.value)].status = "";
        return {
        
            ...state,
            tempEdge: [],
            vertexList: tempVertexList,
            instructionMess: "You can't draw an edge connect a vertex to itsefl"
        }
    }

    if(action.type === 'OPEN_EDGE_FORM'){
        let vertex = action.payload;
        let tempTempEdge = state.tempEdge.slice(0);
        let tempVertexList = state.vertexList.slice(0);
        tempTempEdge.push(vertex);
        tempVertexList[findVertex(vertex.value)].status = "is-selecting";
        tempVertexList[findVertex(tempTempEdge[0].value)].status = "is-selecting";

        return{
            ...state,
            tempEdge: tempTempEdge,
            vertexList: tempVertexList,
            openEdgeForm: true,
        }
    }

    

    if (action.type === 'ADD_EDGE') {
        let {weight, dir} = action.payload;
        let vertex1 = state.tempEdge[0];
        let vertex2 = state.tempEdge[1];
        let tempEdgeList = state.edgeList.slice(0);
        let tempVertexList = state.vertexList.slice(0);
        tempVertexList[findVertex(vertex1.value)].status="";
        tempVertexList[findVertex(vertex2.value)].status="";

        let id = vertex1.value.toString() + vertex2.value.toString();
        let index = isInEdgeList(vertex1, vertex2, dir, state.edgeList);
        if(index === -1){
            //Thêm mới
            let [length, angle] = calculateEdgeProp(vertex1, vertex2);
            let tempMatrix = state.matrix.slice(0);
            tempMatrix[findVertex(vertex1.value)][findVertex(vertex2.value)] = weight;
            
            let startX = vertex1.x;
            let startY = vertex1.y;
            if(vertex1.x > vertex2.x){
                startX = vertex2.x;
                startY = vertex2.y;
            }
            
            if(dir === 0){
                tempMatrix[findVertex(vertex2.value)][findVertex(vertex1.value)] = weight;
            }
            else{
                let otherEdgeIndex = isInEdgeList(vertex2, vertex1, dir, state.edgeList);
                if(otherEdgeIndex !== -1){
                    const R = 15;
                    let dentaX = 0;
                    let dentaY = 0;
                    if(angle < 0){
                        dentaX = R*Math.cos(rad(90+angle));
                        dentaY = R*Math.sin(rad(90+angle));
                        tempEdgeList[otherEdgeIndex].startX = startX + dentaX;
                        tempEdgeList[otherEdgeIndex].startY = startY + dentaY;
                        startX = startX - dentaX;
                        startY = startY - dentaY;
                    }
                    else{
                        dentaY = R*Math.cos(rad(angle));
                        dentaX = R*Math.sin(rad(angle));
                        tempEdgeList[otherEdgeIndex].startX = startX - dentaX;
                        tempEdgeList[otherEdgeIndex].startY = startY + dentaY;
                        startX = startX + dentaX;
                        startY = startY - dentaY;
                    }
                }
            }
            tempEdgeList.push({ vertex1, 
                                vertex2, 
                                length, 
                                angle, 
                                id, 
                                weight, 
                                dir,
                                startX,
                                startY})
            return {
                ...state,
                openEdgeForm: false,
                isDirected: dir,
                edgeList: tempEdgeList,
                vertexList: tempVertexList,
                tempEdge: [],
                instructionMess: "Click any two vertices to draw an edge"
            }
        }
        else{
            //cập nhật
            tempEdgeList[index].weight = weight;
            return{
                ...state,
                openEdgeForm: false,
                tempEdge: [],
                edgeList: tempEdgeList,
                vertexList: tempVertexList,
                instructionMess: "Click any two vertices to draw an edge"
            }
        }
    }

	if (action.type === 'REMOVE_VERTEX') {
        let vertex = action.payload;
        let tempMatrix = state.matrix.slice(0);
        let tempVertexList = state.vertexList.slice(0);
        let tempEdgeList = state.edgeList.slice(0);
        let n = tempMatrix.length;
        for(let i = 0 ; i < n ; i++){
            tempMatrix[i][vertex.value-1] = "x";
            tempMatrix[vertex.value-1][i] = "x";
        }
        tempVertexList = tempVertexList.filter((item)=>{
            return item.value !== vertex.value;
        })
        tempEdgeList = tempEdgeList.filter((item)=>{
            return item.vertex1.value !== vertex.value && item.vertex2.value !== vertex.value;
        })
		return {
            ...state, 
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            matrix: tempMatrix,
        };
	}

    if (action.type === 'REMOVE_EDGE') {
        let tempMatrix = state.matrix.slice(0);
        let tempEdgeList = state.edgeList.slice(0);
        let edge = action.payload;
        let {vertex1, vertex2 ,id} = edge;
        tempMatrix[vertex1.value - 1][vertex2.value - 1] = 0;
        if(state.isDirected === false){
            tempMatrix[vertex2.value - 1][vertex1.value - 1] = 0;
        }
        tempEdgeList = tempEdgeList.filter((edge)=>{
            return edge.id !== id;
        })
		return {
            ...state, 
            matrix: tempMatrix,
            edgeList: tempEdgeList,
        };
	}

	if (action.type === 'CALCULATING') {
		return { 
            ...state, 
           
        };
	}

    if(action.type === 'REMOVE_ALL'){
        console.log("REMOVE ALL")
        return { 
            ...state, 
            matrix: [],
            vertexList: [],
            edgeList: [],
            tempEdge: [],
            isDirected: -1,
            instructionMess: "",
        };
    }

	throw new Error('no matching action type');
};
