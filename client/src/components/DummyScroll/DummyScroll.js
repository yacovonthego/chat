import React, { useEffect, useRef } from 'react';

const DummyScroll = () => {

    // useRef is a way specified in docs to refer to a node
    const dummy = useRef(null);

    useEffect(() => {
        // after every render scroll dummy to the view
        dummy.current.scrollIntoView();   
        return () => {
            
        };
    });

    return (
        // here's dummy :^)
        <div ref={dummy}></div>
    )
};

export default DummyScroll;