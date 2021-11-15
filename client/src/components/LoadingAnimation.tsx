import React from 'react';
import { Placeholder } from 'react-bootstrap';
import '../styles/displayresults.css'

const LoadingAnimation = () => {
    return (
        <div className='loading-container'>
            <Placeholder className='loading-bar' as="p" animation="glow">
                <Placeholder xs={7} />
            </Placeholder>
            <Placeholder className='loading-bar' as="p" animation="wave">
                <Placeholder xs={7} />
            </Placeholder>
            <Placeholder className='loading-bar' as="p" animation="glow">
                <Placeholder xs={7} />
            </Placeholder>
                <Placeholder className='loading-bar' as="p" animation="wave">
            <Placeholder xs={7} />
                </Placeholder>
            <Placeholder className='loading-bar' as="p" animation="glow">
                <Placeholder xs={7} />
            </Placeholder>
            <Placeholder className='loading-bar' as="p" animation="wave">
                <Placeholder xs={7} />
            </Placeholder>
            <Placeholder className='loading-bar' as="p" animation="wave">
                <Placeholder xs={7} />
            </Placeholder> 
        </div>
    );
};

export default LoadingAnimation;