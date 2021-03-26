import React, {useState} from 'react'

const MatrixForm = ({option,handleCloseMatrixForm, handleChangeMatrixForm,handleSubmitMatrixForm  }) => {


    const [myState, setMyState] = useState({matrix: [], openI: false, invalidValue: false, invalidMatrix: false})
    let formInstruction = "";
    if(option === 1){
        formInstruction = <p>
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
                <span>5</span> <span>7</span> <span>Inf</span> 
                <span>Inf</span> <span>2</span> <span>2</span>
                <span>-1</span> <span>Inf</span> <span>4</span> 
            </span>
            * Each value is separated by a space
        </p>
    }
    else{

    }

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
        let tempMatrix = myState.matrix.split('\n');
        let n = tempMatrix.length;
        let notSquareMatrix = false;
        let invalidVal = false;
        for(let i = 0 ; i < n ; i++){
            tempMatrix[i] = tempMatrix[i].split(" ");
            tempMatrix[i] = tempMatrix[i].filter((item)=>{
                return item !== "";
            })
        }
        
       for(let i = 0 ; i < n; i ++){
           let m = tempMatrix[i].length;
           for(let j = 0 ; j < m ;j++){
               if(tempMatrix[i][j] !== "Inf" && isNaN(tempMatrix[i][j])){
                   invalidVal = true;
               }
           }
       }

        if(option === 1){
            for(let i = 0; i < n ; i++){
                if(tempMatrix[i].length !== n){
                    notSquareMatrix = true;
                    break;
                }
            }
        }
        console.log(tempMatrix)
        // handleSubmitMatrixForm(state)
    }

    const handleChangeType = () =>{
        handleChangeMatrixForm();
    }

    return (
        <div className="matrix-form">
            <div className="matrix-form__content">
                <div className="matrix-form__header">
                    <h3>{option === 1 ? "Adj Matrix" : "Adj List"}</h3>
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
                        {formInstruction}
                    </div>
                </div>

                <div className="matrix-form__error-message">

                </div>

                <div className="matrix-form__buttons">
                    <button onClick={handleSubmitForm}>OK</button>
                    <button onClick={handleChangeType}>Adj List</button>
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
