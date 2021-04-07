import React from 'react'
import {useState, useEffect} from 'react'

/* ======== Component ========*/ 
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';
import MatrixForm from './components/MatrixForm';
import Contact from './components/Contact';
/* ======== SCSS =========*/ 
import './App.scss'


const App = () => {
    const [userOption, setUserOption] = useState('');
    const [matrix, setMatrix] = useState([])
    /*UserOption = 1 => Adjacency Matrix*/
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

    useEffect(() => {
        if(userOption === ''){
            setMatrix([]);
        }
    }, [userOption])
    
    return (
        <div className="container">
            <Navbar getUserOption={getUserOption}></Navbar>
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

            {userOption === 2 ?
                    <Contact></Contact> : ""
            }
            
        </div>  
    )
}

export default App
