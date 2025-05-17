import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Test content to make sure React is rendering
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Root element not found! The app cannot mount.");
    // Create a fallback element to show error
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.color = 'white';
    errorDiv.innerText = 'Error: Root element not found. Check your HTML.';
    document.body.appendChild(errorDiv);
}
