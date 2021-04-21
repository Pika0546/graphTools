export const reducer = (state, action) => {

    const resetStatus = ()=>{
        let tempVertexList = state.vertexList;
        let tempEdgeList = state.edgeList;
        let n = tempVertexList.length;
        for(let i = 0 ; i < n ; i++){
            if(tempVertexList[i].status !== ""){
                tempVertexList[i].status = '';
            }
        }
        n = tempEdgeList.length;
        for(let i = 0 ; i < n ; i++){
            if(tempEdgeList[i].status !== ""){
                tempEdgeList[i].status = '';
            }
        }
        console.log("reset");
        return [tempVertexList,tempEdgeList];
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
		let y = (ya - yo)*Math.cos(alpha) + yo;
		let x1 = Math.sqrt((ya - yo) * (ya - yo) - (y - yo)*(y - yo)) + xo;
		let x2 = -Math.sqrt((ya - yo) * (ya - yo) - (y - yo)*(y - yo)) + xo;
		return [x1, y, x2, y];
	}

    const findEdge =(vertex1, vertex2, edgeList = state.edgeList)=>{
        let index = edgeList.findIndex((item)=>{
            if(item.dir === 1){
                return (vertex1.toString() + vertex2.toString()) === item.id;
            }
            else{
                return (vertex1.toString() + vertex2.toString()) === item.id || item.id === (vertex2.toString() + vertex1.toString()) ;
            }
        })
        return index;
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
                    edgeList[otherEdgeIndex].startY = edgeList[otherEdgeIndex].startY + dentaY;
                    startX = startX - dentaX;
                    startY = startY - dentaY;
                }
                else{
                    dentaY = R*Math.cos(rad(angle));
                    dentaX = R*Math.sin(rad(angle));
                    edgeList[otherEdgeIndex].startX = startX - dentaX;
                    edgeList[otherEdgeIndex].startY = edgeList[otherEdgeIndex].startY + dentaY;
                    startX = startX + dentaX;
                    startY = startY - dentaY;
                }
                
            }
        }
        if(dir === 0 &&  isInEdgeList(vertex2, vertex1, dir, edgeList) !== -1){
            return;
        }
        edgeList.push({ vertex1, 
            vertex2, 
            length, 
            angle, 
            id, 
            weight, 
            dir,
            startX,
            startY,
            status: ""})
    }

    const floydWarshall = (matrix, src, des) => {
  
        const n = matrix.length;
    
        let resultMatrix = [];
        let next = [];
        for(let i = 0 ; i < n ; i ++){
            resultMatrix[i] = matrix[i].slice(0);
            let nextRow = []
            for(let j = 0 ; j < n ; j++){
                nextRow[j] = 0;
            }
            next.push(nextRow);
        }
        for(let i = 0; i < n ; i++){
            for(let j = 0 ; j < n ; j++){
                if((matrix[i][j] === Infinity || matrix[i][j] === "x") && i!== j){
                    continue;
                }
                else{
                    next[i][j] = j;
                }
            }
        }
        for(let k = 0; k < n; k++){
            for(let i = 0;  i < n; i++){
                for(let j = 0; j < n ; j++){
                    if(k === i || k === j || j === i ){
                        continue;
                    }
                    else if(resultMatrix[i][j] !== "x" && resultMatrix[i][k] !== "x" && resultMatrix[k][j] !== "x"){
                        if(resultMatrix[i][j] > resultMatrix[i][k] + resultMatrix[k][j]){
                            resultMatrix[i][j] = resultMatrix[i][k] + resultMatrix[k][j];
                            next[i][j] = next[i][k];
                        }
                    }
                }
            }
        }
        
        let resultPaths = [];
      
        for(let i = 1 ;i <= n ;i ++){
            for(let j = 1 ; j <= n ; j++){
                if(matrix[i-1][j-1] !== "x"){
                    if(i === j){
                        resultPaths.push([i,j]);
                    }
                    else{
                        let tempPath = [];
                        let k = next[i - 1][j - 1];
                        if(k === i -1 || k === 0){
                            resultPaths.push([]);
                        }
                        else{
                            tempPath.push(i);
                            for(; k !== j - 1; k = next[k][j-1]){
                                tempPath.push(k+1);
                            }
                            tempPath.push(j);
                            resultPaths.push(tempPath);
                        }
                    }    
                }
                else{
                    resultPaths.push("x");
                }
               
            }
        }
      
        return {resultPaths, resultMatrix};
    }

    const DFSUtil = (matrix, src, visited)=>{
        let stack = [];
        let resultVertices = [];
        const n = matrix.length;
        stack.push(src);
        let resultEdges = [];
        while(stack.length !== 0){
            let s = stack.pop();
            if(!visited[s]){
                const n = resultVertices.length;
                for(let i = n-1 ; i >= 0 ; i--){
                    if(matrix[resultVertices[i]][s] !== Infinity && resultVertices[i] !== s){
                        resultEdges.push([resultVertices[i],s]);
                        break;
                    }
                }
                resultVertices.push(s);
                visited[s] = true;
            }
            for(let i = 0 ; i < n ; i++){
                if(matrix[s][i] !== Infinity && matrix[s][i]!== 'x' && !visited[i]){
                    stack.push(i);
                }
            }
        }
       
        return [resultVertices, resultEdges];
    }

    const DFS = (matrix, src) => {
        let visited = [];
        let tempSrc = src - 1;
        const n = matrix.length;
        for(let i = 0 ; i < n ; i++){
            visited.push(false);
        }
        let resultVertices = [];
        let resultEdges = [];
      
        let result = DFSUtil(matrix, tempSrc, visited);
        
        resultVertices.push(result[0]);
        resultEdges.push(result[1]);
        for(let i = 0 ; i < n ; i++){
            if(!visited[i] && matrix[i][i] !== 'x'){
                result = DFSUtil(matrix, i, visited);
                
                resultVertices.push(result[0]);
                resultEdges.push(result[1]);
            }
        }
        return [resultVertices, resultEdges];
    }

    const BFSUtil = (matrix, src, visited)=>{
        let queue = [];
        let resultVertices = [];
        let resultEdges = [];
        const n = matrix.length;
        queue.push(src);
        while(queue.length !== 0){
            let s = queue.shift();
            if(!visited[s]){
                const resultVerticesSize = resultVertices.length;
                for(let i = 0 ; i< resultVerticesSize;i++){
                    if(matrix[resultVertices[i]][s] !== Infinity && resultVertices[i] !== s){
                        resultEdges.push([resultVertices[i],s]);
                        break;
                    }
                }
                resultVertices.push(s);
                visited[s] = true;
            }
            for(let i = 0; i < n ; i++){
                if(matrix[s][i] !== Infinity && matrix[s][i]!== 'x' && !visited[i]){
                    queue.push(i);
                }
            }
        }
        return [resultVertices, resultEdges];
    }

    const BFS = (matrix, src)=>{
        let visited = [];
        let tempSrc = src - 1;
        const n = matrix.length;
        for(let i = 0 ; i < n ; i++){
            visited.push(false);
        }
        let resultVertices = [];
        let resultEdges = [];
      
        let result = BFSUtil(matrix, tempSrc, visited);
        
        resultVertices.push(result[0]);
        resultEdges.push(result[1]);
        for(let i = 0 ; i < n ; i++){
            if(!visited[i] && matrix[i][i] !== 'x'){
                result = BFSUtil(matrix, i, visited);
                resultVertices.push(result[0]);
                resultEdges.push(result[1]);
            }
        }
        return [resultVertices, resultEdges];
    }

    if(action.type === 'DRAW_FULL_GRAPH'){

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

        for(let i = 0 ;i < size; i ++){
            for(let j = 0 ; j < size; j++){
                if(tempMatrix[i][j] === 'inf'){
                    tempMatrix[i][j] = Infinity;
                }
                if((isWeight && tempMatrix[i][j] !== Infinity && i !== j) || (!isWeight && tempMatrix[i][j] !== 0)){
                  
                    let index1 = findVertex(i + 1, tempVertexList);
                    let index2 = findVertex(j + 1, tempVertexList);
                   
                    addEdge(tempVertexList[index1],tempVertexList[index2],tempEdgeList,  isDir, isWeight ? tempMatrix[i][j] : 0);
                }
                
            }
        }

        if(!isWeight){
            for(let i = 0 ; i < 0 ; i++){
                for(let j = 0 ; j < 0; j ++){
                    if(tempMatrix[i][j] === 0){
                        tempMatrix[i][j] = Infinity;
                    }
                    else if(tempMatrix[i][j] === 1){
                        tempMatrix[i][j] = 0;
                    }
                }
            }
        }

        return {
            ...state,
            matrix: tempMatrix,
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            isDirected: isDir,
            tempEdge: [],
        }
    }

    if(action.type === 'START_ADD_VERTEX'){
        let [tempVertexList, tempEdgeList] = resetStatus();
        return{
            ...state,
            tempEdge: [],
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            instructionMess:"Click everywhere on the canvas to draw a vertex"
        }
    }

    if(action.type === 'START_ADD_EDGE'){
        let [tempVertexList, tempEdgeList] = resetStatus();
        return{
            ...state,
            tempEdge: [],
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            instructionMess:"Click any two vertices to draw an edge"
        }
    }

    if(action.type === 'START_REMOVING'){
        let [tempVertexList, tempEdgeList] = resetStatus();
        return{
            ...state,
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            tempEdge: [],
            instructionMess:"Click on anything to remove it from your graph"
        }
    }

	if (action.type === 'DEFAULT') {
        let [tempVertexList, tempEdgeList] = resetStatus();
        console.log("DEFAULT");
		return {
            ...state,
            vertexList:tempVertexList,
            edgeList:tempEdgeList,
            tempEdge: [],
            instructionMess: "",
        }
	}

    if(action.type === "CLEAR_TEMP"){
        
        let [tempVertexList, tempEdgeList] = resetStatus();
        console.log("CLEAR_TEMP");
		return {
            ...state,
            vertexList:tempVertexList,
            edgeList:tempEdgeList,
            tempEdge: [],
            
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
                tempEdge: [],
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
            tempEdge: [],
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

    if(action.type === 'ADD_1_VERTEX_TO_TEMP'){
        let vertex = action.payload;
        let temp = state.tempEdge.slice(0);
        let [tempVertexList, tempEdgeList] = resetStatus();
        temp.push({x: vertex.x, y: vertex.y, value: vertex.value});
        let n = tempVertexList.length;
        for(let i = 0; i < n ; i ++){
            tempVertexList[i].status = "";
        }
        n = tempEdgeList.length;
        for(let i = 0; i < n; i ++){
            tempEdgeList[i].status = "";
        }
        tempVertexList[findVertex(vertex.value)].status="is-selecting";

        return {
            ...state,
            vertexList: tempVertexList,
            tempEdge: temp,
            edgeList: tempEdgeList,
            instructionMess: "Choose another vertex!",
        }
    }

    if(action.type === 'DUPLICATE_VERTEX'){
        let tempVertexList = state.vertexList.slice(0)
        let vertex1 = action.payload.vertex;
        let vertex2 = state.tempEdge[0];
        tempVertexList[findVertex(vertex1.value)].status = "";
        tempVertexList[findVertex(vertex2.value)].status = "";
        return {
        
            ...state,
            tempEdge: [],
            vertexList: tempVertexList,
            instructionMess: action.payload.message
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
                        tempEdgeList[otherEdgeIndex].startY = tempEdgeList[otherEdgeIndex].startY + dentaY;
                        startX = startX - dentaX;
                        startY = startY - dentaY;
                    }
                    else{
                        dentaY = R*Math.cos(rad(angle));
                        dentaX = R*Math.sin(rad(angle));
                        tempEdgeList[otherEdgeIndex].startX = startX - dentaX;
                        tempEdgeList[otherEdgeIndex].startY = tempEdgeList[otherEdgeIndex].startY + dentaY;
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
                                startY,
                                status: ""})
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
        if(tempVertexList.length === 0){
            tempMatrix = [];
        }
		return {
            ...state, 
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            matrix: tempMatrix,
            tempEdge: []
        };
	}

    if (action.type === 'REMOVE_EDGE') {
        let tempMatrix = state.matrix.slice(0);
        let tempEdgeList = state.edgeList.slice(0);
        let edge = action.payload;
        let {vertex1, vertex2 ,id} = edge;
        tempMatrix[vertex1.value - 1][vertex2.value - 1] = Infinity;
        if(state.isDirected === 0){
            tempMatrix[vertex2.value - 1][vertex1.value - 1] = Infinity;
        }
        tempEdgeList = tempEdgeList.filter((edge)=>{
            return edge.id !== id;
        })
		return {
            ...state, 
            matrix: tempMatrix,
            edgeList: tempEdgeList,
            tempEdge: [],
        };
	}

	if (action.type === 'START_FIND_SP') {
        let [tempVertexList, tempEdgeList] = resetStatus();
		return { 
            ...state, 
            vertexList: tempVertexList,
            tempEdge: [],
            edgeList: tempEdgeList,
            instructionMess:"Choose one source vertex and one destination vertex"
        };
	}

    if(action.type === 'FIND_SP'){
     
        let src = state.tempEdge[0];
        let des = action.payload;
        let {resultPaths, resultMatrix} = floydWarshall(state.matrix, src.value, des.value);
        // let tempVertexList = state.vertexList.slice(0);
        // let tempEdgeList = state.edgeList.slice(0);
        let [tempVertexList, tempEdgeList] = resetStatus();
        let vertexAmount = state.matrix.length;
        let resultPath = resultPaths[(src.value - 1)*vertexAmount + (des.value - 1)];
       
        resultPath.forEach((value)=>{
            tempVertexList[findVertex(value)].status = "is-in-SP";
        })
       
        const n = resultPath.length;
        for(let i = 0 ; i < n ; i++){
            tempVertexList[findVertex(resultPath[i])].status = "is-in-SP";
            if(i < n - 1){
                tempEdgeList[findEdge(resultPath[i], resultPath[i+1])].status = "is-in-SP";
            }
        }
        if(n === 0){
            tempVertexList[findVertex(src.value)].status = "is-in-SP";
            tempVertexList[findVertex(des.value)].status = "is-in-SP";
       
        }
        
        let resultPathList = resultPaths.map((item, index)=>{
            let i = Math.floor(index/vertexAmount);
            let j = index%vertexAmount;
         
            if(state.matrix[i][j] !== "x"){
                if(item.length === 0){
                    return <span key={index}>Shortest path from {i + 1} to {j + 1}: Not Exist <br></br></span>
                }else{
                    let path =item.join(" -> ");
                    return <span key={index}>Shortest path from {i+ 1} to {j + 1}: {path}, Weight: {resultMatrix[i][j]} <br></br></span>
                }
            }

        })
        return{
            ...state,
            tempEdge: [],
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            instructionMess:<span className="result-algo"> {resultPathList} </span>,

        }
    }
    
    if(action.type === 'REMOVE_ALL'){

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

    if(action.type === 'START_FIND_MST'){
        let [tempVertexList, tempEdgeList] = resetStatus();
		return { 
            ...state, 
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            tempEdge: [],
            instructionMess:"I HAVE NOT DONE THIS PART YET."
        };
    }

    if(action.type === 'START_DFS' || action.type === 'START_BFS'){
        let [tempVertexList, tempEdgeList] = resetStatus();
		return { 
            ...state, 
            vertexList: tempVertexList,
            edgeList: tempEdgeList,
            tempEdge: [],
            instructionMess:"Please choose one vertex to start"
        };
    }

    if(action.type === 'DFS'){
        let vertex = action.payload;
        let result = DFS(state.matrix, vertex.value);
        let resultEdges = result[1];
        let resultVertices = result[0];
     
        const resultVerticesSize = resultVertices.length;
        for(let i = 0 ; i < resultVerticesSize; i++){
            const tempSize = resultVertices[i].length;
            for(let j = 0 ; j < tempSize; j++){
                resultVertices[i][j] += 1;
            }
        }
        const resultEdgesSize = resultEdges.length;
        for(let i = 0; i < resultEdgesSize; i++){
            let tempSize = resultEdges[i].length;
            for(let j = 0 ; j < tempSize; j++){
                resultEdges[i][j][0] +=1;
                resultEdges[i][j][1] +=1;
            }
        }
      
        let [tempVertexList, tempEdgeList] = resetStatus();
        let resultList =[];
      
        resultVertices.forEach((item)=>{
            const n = item.length;
            resultList.push(item.join(" "));
            for(let i = 0 ; i < n; i++){
                tempVertexList[findVertex(item[i])].status = "is-in-DFS";
            }
        })
        
        resultEdges.forEach(item=>{
            const n = item.length;
            for(let i = 0 ; i < n;i++){
                tempEdgeList[findEdge(item[i][0], item[i][1])].status = "is-in-DFS"

            }
        })
        resultList = resultList.join(" ");
    
        return {
            ...state,
            edgeList: tempEdgeList,
            vertexList: tempVertexList,
            instructionMess: resultList,
            tempEdge: [],
        }
    }

    if(action.type === 'BFS'){
        let vertex = action.payload;
        let result = BFS(state.matrix, vertex.value);
        let resultEdges = result[1];
        let resultVertices = result[0];
     
        const resultVerticesSize = resultVertices.length;
        for(let i = 0 ; i < resultVerticesSize; i++){
            const tempSize = resultVertices[i].length;
            for(let j = 0 ; j < tempSize; j++){
                resultVertices[i][j] += 1;
            }
        }
        const resultEdgesSize = resultEdges.length;
        for(let i = 0; i < resultEdgesSize; i++){
            let tempSize = resultEdges[i].length;
            for(let j = 0 ; j < tempSize; j++){
                resultEdges[i][j][0] +=1;
                resultEdges[i][j][1] +=1;
            }
        }
      
        let [tempVertexList, tempEdgeList] = resetStatus();
        let resultList =[];
      
        resultVertices.forEach((item)=>{
            const n = item.length;
            resultList.push(item.join(" "));
            for(let i = 0 ; i < n; i++){
                tempVertexList[findVertex(item[i])].status = "is-in-DFS";
            }
        })
   
        resultEdges.forEach(item=>{
            const n = item.length;
            for(let i = 0 ; i < n;i++){
                tempEdgeList[findEdge(item[i][0], item[i][1])].status = "is-in-DFS"

            }
        })
        resultList = resultList.join(" ");
    
        return {
            ...state,
            edgeList: tempEdgeList,
            vertexList: tempVertexList,
            instructionMess: resultList,
            tempEdge: [],
        }
    }
    
    if(action.type === 'COUNT_CC'){
        let N = state.matrix.length;
        let src = 0;
        for(let i = 0 ; i < N ; i++){
            if(state.matrix[i][i] !== 'x'){
                src = i;
                break;
            }
        }
        src += 1;
        if(N > 0){
           
            let result = DFS(state.matrix, src);
            let resultEdges = result[1];
            let resultVertices = result[0];

            const resultVerticesSize = resultVertices.length;
            for(let i = 0 ; i < resultVerticesSize; i++){
                const tempSize = resultVertices[i].length;
                for(let j = 0 ; j < tempSize; j++){
                    resultVertices[i][j] += 1;
                }
            }
            const resultEdgesSize = resultEdges.length;
            for(let i = 0; i < resultEdgesSize; i++){
                let tempSize = resultEdges[i].length;
                for(let j = 0 ; j < tempSize; j++){
                    resultEdges[i][j][0] +=1;
                    resultEdges[i][j][1] +=1;
                }
            }
          
            let [tempVertexList, tempEdgeList] = resetStatus();
            let resultList =[];
            let tempString = <span key="-1" >Amount of Connected Component:  {resultVerticesSize} <br></br> </span>;
            resultList.push(tempString);
          
            resultVertices.forEach((item)=>{
                const n = item.length;
                let temp = item.join(" ");
                resultList.push(<span key={temp}>Component: {temp} <br></br></span>)
                for(let i = 0 ; i < n; i++){
                    tempVertexList[findVertex(item[i])].status = "is-in-DFS"; 
                }
            })
          
            resultEdges.forEach(item=>{
                const n = item.length;
                for(let i = 0 ; i < n;i++){
                    tempEdgeList[findEdge(item[i][0], item[i][1])].status = "is-in-DFS"
    
                }
            })
            // resultList = resultList.join(", ");
        
            return {
                ...state,
                edgeList: tempEdgeList,
                vertexList: tempVertexList,
                instructionMess: <span className="result-algo">{resultList}</span>,
                tempEdge: [],
            }
        }
        return {
            ...state,
            tempEdge: []
        }
    }
	throw new Error('no matching action type');
};
