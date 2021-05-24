import React from 'react'

/* ======== Router ======== */
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
/* ======== Component ========*/ 
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Contact from './components/Contact';
import Error from './components/Error';
/* ======== SCSS =========*/ 
import './App.scss'


const App = () => {
    // const [userOption, setUserOption] = useState(1);
    // // const [matrix, setMatrix] = useState([])
    // // /*UserOption = 1 => Adjacency Matrix*/
    // // /*UserOption = 0 => Draw*/


    // const getUserOption = (option) =>{
    //     setUserOption(option);
    // }

    // const handleCloseMatrixForm = () =>{
    //     setUserOption(0);
    // }

    // const handleSubmitMatrixForm = (matrix) =>{
    //     setUserOption(0);
    //     setMatrix(matrix);
    // }

    // useEffect(() => {
    //     if(userOption === '' || userOption === 2){
    //         setMatrix([]);
    //     }
    // }, [userOption])
    

    return (
        <div className="container">
            <HashRouter basename='/'>
                <Navbar/>
                <Switch>
                    <Route exact path='/'>
                        <Intro />
                    </Route>
                    <Route exact path='/contact'>
                        <Contact />
                    </Route>
                    {/* <Route exact path='/main/:flag'  children={ <Main/> }></Route> */}
                    
                    <Route exact path='/main/:flag'  render={(props) => <Main {...props} key={Date.now()}/>} ></Route>
                    <Route path='*'>
                        <Error />
                    </Route>
                </Switch>
            </HashRouter>
        </div>  
    )
}

export default App
