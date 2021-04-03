import React from 'react'
import {useState, useReducer} from 'react'

/* ======== Component ========*/ 
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';
import MatrixForm from './components/MatrixForm';

/* ======== SCSS =========*/ 
import './App.scss'


const App = () => {
    const [userOption, setUserOption] = useState('');
    const [matrix, setMatrix] = useState([])
    /*UserOption = 1 => Adjacency Matrix*/
    /*UserOption = 2 => Adjacency List*/
    /*UserOption = 0 => Draw*/


    const getUserOption = (option) =>{
        setUserOption(option);
    }

    const handleCloseMatrixForm = () =>{
        setUserOption(0);
    }

    const handleSubmitMatrixForm = (matrix) =>{
        setUserOption(0);
        setMatrix(matrix);
    }
    
    return (
        <div className="container">
            <Navbar></Navbar>
            {/* <ResponMenu></ResponMenu> */}
            {userOption==='' ? 
                <Intro getUserOption={getUserOption}></Intro>:""
            }
            
        
            {(userOption === 1)?
                <MatrixForm 
                    handleCloseMatrixForm={handleCloseMatrixForm}
                    handleSubmitMatrixForm={handleSubmitMatrixForm}
                ></MatrixForm> : ""
            }
           
            
            {userOption === 0 ? 
                    <Canvas matrix={matrix}></Canvas>
                : ""
            }
        </div>  
    )
}

export default App
