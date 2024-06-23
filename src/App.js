import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import SurveyForm from './components/SurveyForm/SurveyForm';
import EventRegistrationForm from './components/EventRegistrationForm/EventRegistrationForm';
import JobApplicationForm from './components/JobApplicationForm/JobApplicationForm';
import './App.css';

const App = () => {
  const location = useLocation();
  const hideHeaderAndButtons = ['/level1', '/level2', '/level3'].includes(location.pathname);

  return (
    <div className="App">
      {!hideHeaderAndButtons && (
        <>
          <div className="h1-tag">
            <h1>React js Assignment</h1>
          </div>
          <div className="btns">
            <button>
              <Link to="/level1">Level 1</Link>
            </button>
            <button>
              <Link to="/level2">Level 2</Link>
            </button>
            <button>
              <Link to="/level3">Level 3</Link>
            </button>
          </div>
        </>
      )}
      <Routes>
        <Route path="/level1" element={<EventRegistrationForm />} />
        <Route path="/level2" element={<JobApplicationForm />} />
        <Route path="/level3" element={<SurveyForm />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
