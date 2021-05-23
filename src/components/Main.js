import React from 'react'
import MatrixForm from './MatrixForm';
import Canvas from './Canvas';
import { useParams } from 'react-router-dom';
import {useState} from 'react'

const Main = () => {
    const [option, setOption] = useState(1);
    const [matrix, setMatrix] = useState([])

    let {flag} = useParams();

    const handleCloseMatrixForm = () =>{
        setOption(0);
    }

    const handleSubmitMatrixForm = (matrix) =>{
        setOption(0);
        setMatrix(matrix);
    }

    
   
    return (
        <>
            {(parseInt(flag) > 0 && option === 1)?
                <MatrixForm 
                    handleCloseMatrixForm={handleCloseMatrixForm}
                    handleSubmitMatrixForm={handleSubmitMatrixForm}
                ></MatrixForm> : ""
            }
            <Canvas matrix={matrix}></Canvas>
        </>
    )
}

export default Main
