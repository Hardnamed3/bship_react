import React from 'react';
import {Circles} from 'react-loader-spinner';  // import loader from the package

const PageLoader = () => {
    return (
        <div style={styles.overlay}>
            <Circles color="#00BFFF" height={100} width={100} />
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
};

export default PageLoader;