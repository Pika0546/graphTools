import React, {useState, useEffect} from 'react'

const MatrixForm = ({handleCloseMatrixForm,handleSubmitMatrixForm  }) => {


    const [myState, setMyState] = useState({
        matrix: [], 
        openI: false, 
        invalidValue: false, 
        invalidMatrix: false,
        isRing: false,
    })

    const handleChange = (event) =>{
        let value = event.target.value;
        setMyState({
           ...myState,
           matrix: value,
       })
    }

    const handleCloseForm = () => {
        handleCloseMatrixForm();
    }

    const handleSubmitForm = () => {
        if(myState.matrix.length !== 0){
            let tempMatrix = myState.matrix.split('\n');
            tempMatrix = tempMatrix.filter((item)=>{
                 return item.length !== 0;
            })
            let n = tempMatrix.length;
            let notSquareMatrix = false;
            let invalidVal = false;
            let ring = false;
            
            for(let i = 0 ; i < n ; i++){
                tempMatrix[i] = tempMatrix[i].replaceAll(/,/g,'');
                tempMatrix[i] = tempMatrix[i].split(" ");
                tempMatrix[i] = tempMatrix[i].filter((item)=>{
                    return item !== "";
                })
                let m = tempMatrix[i].length;
                for(let j = 0 ; j < m ; j++){
                    tempMatrix[i][j] = tempMatrix[i][j].toLowerCase();
                }
            }
            for(let i = 0 ; i < n; i ++){
                let m = tempMatrix[i].length;
                for(let j = 0 ; j < m ;j++){
                    if(tempMatrix[i][j] !== "inf"  && isNaN(tempMatrix[i][j])){
                        invalidVal = true;
                    }
                }
                if(tempMatrix[i][i] !== '0'){
                    ring = true;
                }
            }
    
            for(let i = 0; i < n ; i++){
                if(tempMatrix[i].length !== n){
                    notSquareMatrix = true;
                    break;
                }
            }
            if(notSquareMatrix || invalidVal || ring){
                setMyState({
                    ...myState,
                    invalidValue: invalidVal,
                    invalidMatrix: notSquareMatrix,
                    isRing: ring
                })
            }else{
                for(let i = 0; i < n ; i++){
                    for(let j = 0 ; j < n ; j ++){
                        if(tempMatrix[i][j] !== "inf"){
                            tempMatrix[i][j] = Number(tempMatrix[i][j])
                        }
                    }
                }
                setMyState({
                    ...myState,
                    matrix: tempMatrix,
                    invalidValue: false,
                    invalidMatrix: false,
                })
                handleSubmitMatrixForm(tempMatrix)
                
            }    
        }else{
            handleSubmitMatrixForm([]);
            handleCloseMatrixForm();
        }
    }

    

    return (
        <div 
            className="matrix-form" 
            onClick={handleCloseForm}
        >
            <div 
                className="matrix-form__content"
                onClick={(e)=>{
                    e.stopPropagation();
                }}
            >
                <div className="matrix-form__header">
                    <h3>Create Graph</h3>
                </div>
                <div className="matrix-form__mid-row">
                    <div className="matrix-form__form">
                        <textarea 
                            cols="30" 
                            rows="15" 
                            placeholder="Type here..."
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className={ myState.openI ?  "matrix-form__text open" :"matrix-form__text " }>
                        <p>
                            Enter the adjacency matrix of the graph as follows:<br></br>
                            - For unweighted matrices: <br></br>
                            + Type 0 if there is no edge between two vertices. <br></br>
                            + Type 1 if there is a edge between two vertices. <br></br>
                            + Example: <br></br>
                            <span className="instruction-matrix">
                                <span>0</span> <span>1</span> <span>0</span> 
                                <span>0</span> <span>0</span> <span>1</span>
                                <span>1</span> <span>1</span> <span>0</span> 
                            </span>
                            - For the weighted matrix: <br></br>
                            + Type "Inf" if there is no edge between two vertices. <br></br>
                            + Type the weight of the edge if otherwise.<br></br>
                            + Example: <br></br>
                            <span className="instruction-matrix">
                                <span>0</span> <span>7</span> <span>Inf</span> 
                                <span>Inf</span> <span>0</span> <span>2</span>
                                <span>-1</span> <span>Inf</span> <span>0</span> 
                            </span>
                            * Each value is separated by a space
                            <br></br>
                            * Not allow ring so value at (i,i) must be 0
                        </p>
                    </div>
                </div>

                <div className="matrix-form__error-message">
                    {myState.invalidValue ? <span>Your matrix contain invalid character !</span> : ""}
                    {myState.invalidMatrix ? <span>Your matrix is not square !</span> : ""}
                    {myState.isRing ? <span>Your matrix contain ring !</span> : ""}
                    
                </div>

                <div className="matrix-form__buttons">
                    <button onClick={handleSubmitForm}>OK</button>
                    <button onClick={handleCloseForm}>Cancel</button>
                </div>


                <div 
                    className="matrix-form__close matrix-form__btn"
                    onClick={handleCloseForm}
                >
                    <button>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div 
                    className="matrix-form__open-i matrix-form__btn"
                    onClick={()=>{
                        setMyState({
                            ...myState,
                            openI: !myState.openI,
                        })
                    }}
                >
                    <button>
                        <i className="fas fa-info"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MatrixForm
