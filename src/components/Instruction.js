import React from 'react'

const Instruction = ({message}) => {
    return (
        <div className="instruction">
            <p className="instruction__content"> {message}</p>
        </div>
    )
}

export default Instruction
