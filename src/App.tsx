import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <main className="min-h-screen bg-primary">
                        <Hero />
                    </main>
                } />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App; 