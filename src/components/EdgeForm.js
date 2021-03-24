import React from 'react'
import {useState} from 'react'


const EdgeForm = ({tempEdge, isDirected, addEdge, closeEdgeForm}) => {


    const [state, setState] = useState({weight: 0, dir: isDirected === -1 ? 0 : isDirected, isError: false})

    const validateValue = (value) => {
        let temp = Number(value);
        return !isNaN(temp);
       
    }

    const handleChange = (event)=> {
        let target = event.target;
        let name=target.name;
        let value = target.value;
       
        if(name === "dir"){
            value = Number.parseInt(value)
        }
        else{
            if(validateValue(value)){
                if(value.length > 20){
                    setState({
                        ...state,
                        isError: 'too-big'
                    })
                    return;
                }
                value = Number(value);
               
            }else{
                setState({
                    ...state,
                    isError: 'invalid-syntax',
                }) 
                return;
            }
           
        }
        
        setState({
            ...state,
            [name] : value,
            isError: false
        })
        
    }
    
    const handleSumit = (event) => {
        event.preventDefault();
        if(state.isError === false){
            let {weight , dir} = state;
            addEdge(weight, dir)
        }
       
    }

    return (
        <div className="edge-form">
            <form 
                className="edge-form__content"
                onSubmit={handleSumit}
            >
                <h1 className="gradient-text">Create edge</h1>
                <p>
                    <span> 
                        <span className="gradient-text">
                            Source :
                        </span>
                        <span className="vertex">
                            {tempEdge[0].value}
                        </span>
                    </span> 
                    <span> 
                        <span className="gradient-text">
                            Des   : 
                        </span>
                        <span className="vertex">
                        {tempEdge[1].value}
                        </span>
                    </span> 
                </p>
                
                <div className="edge-form__content__group row-1">
                    <label className="gradient-text">Weight :</label>
                    <input 
                        className="edgeWeight" 
                        type="text" 
                        name="weight" 
                        autoComplete="off"
                        defaultValue={state.weight}
                        onChange={handleChange}
                    ></input>
                    <p className="form-error">{state.isError === 'invalid-syntax' ? 
                                                'Weight must be  a Number !'
                                                 :
                                                 state.isError === 'too-big' ? 
                                                 'Your number is too big !'
                                                  : ""
                                                  }</p>
                </div>
                <div className="edge-form__content__group row-2">
                    <label className="gradient-text row-2__name">Direction :</label>
                    {isDirected === -1 || isDirected === 1 ?
                                <div>
                                <input 
                                    id="yes-dir" 
                                    type="radio" 
                                    name="dir" 
                                    value={1}
                                    onChange={handleChange}
                                    checked={state.dir === 1}
                                ></input>
                                <label htmlFor="yes-dir" className={state.dir === 1 ? "on-selected" : ""}>
                                    <span className="gradient-text">Yes</span>
                                </label>
                            </div>
                            : ""
                    }
                    {isDirected === - 1 || isDirected === 0 ? 
                        <div>
                            <input 
                                id="no-dir"  
                                type="radio" 
                                name="dir" 
                                value={0}
                                onChange={handleChange}
                                checked={state.dir === 0}
                            ></input>
                            <label  className={state.dir === 0 ? "on-selected" : ""} htmlFor="no-dir" >
                                <span className="gradient-text">No</span>
                            </label>
                        </div>
                        : ""
                    }
                </div>
                <div className="edge-form__content__group row-3">
                    <button type="submit">
                        <span className="gradient-text" >OK</span>
                    </button>
                    <button type="button" onClick={()=>{
                        closeEdgeForm()
                    }}>
                        <span className="gradient-text">Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EdgeForm
