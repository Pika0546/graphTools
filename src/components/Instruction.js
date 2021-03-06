import React from 'react'

const Instruction = ({message}) => {
    return (
        <div className="instruction">
            <div className="instruction__content"> {message}</div>
        </div>
    )
}

export default Instruction
