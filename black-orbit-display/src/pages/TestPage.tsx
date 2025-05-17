import React from 'react';
import ParticleBackground from '../components/ParticleBackground';

const TestPage = () => {
    return (
        <div style={{
            padding: '20px',
            background: 'black',
            color: 'white',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1
        }}>
            <ParticleBackground />
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', zIndex: 2 }}>Space Particles Test</h1>
            <p style={{ fontSize: '1.2rem', zIndex: 2 }}>
                If you can see animated stars in the background, the particle system is working correctly!
            </p>
        </div>
    );
};

export default TestPage; 