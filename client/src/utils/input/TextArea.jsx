import React from 'react';

const TextArea = (props) => {
    return (
        <textarea
            className={props.className}
            onChange={(event) => props.setValue(event.target.value)}
            type={props.type}
            value={props.value}
            rows={props.rows} />
    );
};

export default TextArea;