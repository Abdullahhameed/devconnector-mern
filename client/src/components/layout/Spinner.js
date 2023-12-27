import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <section className="container">
            <img src={spinner} style={{ width: '100px', margin: 'auto', display: 'block' }} alt='Loading...' />
        </section>
    );
};

export default Spinner;