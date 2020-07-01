import React from 'react';

const People = (props) => {

    return (
        <div>
            <div>Headers: {props.headers}</div>
            <div>Response: {props.response}</div>
        </div>
    )
}

export default People;