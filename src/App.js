import React from 'react'
import {useState, useReducer} from 'react'

/* ======== Component ========*/ 
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';


/* ======== SCSS =========*/ 
import './App.scss'

// const defaultState = {
//     matrix: [],
//     action: 'default',/* default , adding, removing*/
// }


const App = () => {
    const [userOption, setUserOption] = useState('');
    /*UserOption = 1 => Adjacency Matrix*/
    /*UserOption = 2 => Adjacency List*/
    /*UserOption = 0 => Draw*/


    const getUserOption = (option) =>{
        setUserOption(option);
    }

    return (
        <div className="container">
            <Navbar></Navbar>
            {/* <ResponMenu></ResponMenu> */}
            {userOption==='' ? 
                <Intro getUserOption={getUserOption}></Intro>:""
            }
            
            <div className="graph-form">
                {userOption === 1 ?
                    <h1>Matrix</h1> :
                    userOption === 2 ?
                    <h1>List</h1> : ""
                }
            </div>
            {userOption === 0 ? 
                    <Canvas></Canvas>
                : ""
            }
        </div>  
    )
}

export default App
