import React, { useState, useEffect } from 'react';

const GDPRBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consentGiven = localStorage.getItem('gdprConsent');
        if (!consentGiven) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gdprConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={bannerStyle}>
            <p>
                This application stores your username and messages to provide the service.
                Your data remains stored until you delete it or request deletion.
                Authentication is handled by Auth0.
                You can edit or delete your content at any time through your profile or messages tab.
                By continuing to use this service, you consent to these terms.
            </p>
            <button onClick={handleAccept} style={buttonStyle}>
                Accept
            </button>
        </div>
    );
};

const bannerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
    zIndex: 1000,
};

const buttonStyle = {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'underline',
};

export default GDPRBanner;