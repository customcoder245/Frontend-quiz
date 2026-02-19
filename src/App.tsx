import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import BreakPage1 from './pages/BreakPage1';
import BreakPage2 from './pages/BreakPage2';
import EmailFormPage from './pages/EmailFormPage';
import CalculatingResultsPage from './pages/CalculatingResultsPage';
import PredictedResultsPage from './pages/PredictedResultsPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/break-1" element={<BreakPage1 />} />
                <Route path="/break-2" element={<BreakPage2 />} />
                <Route path="/email-form" element={<EmailFormPage />} />
                <Route path="/calculating" element={<CalculatingResultsPage />} />
                <Route path="/predicted" element={<PredictedResultsPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Fallback for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
