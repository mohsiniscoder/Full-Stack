import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you want to keep styles
import ProductList from './ProductList'; // Import the ProductList component
import Login from './components/Login'; // Import the Login component
import Signup from './components/Signup'; // Import the Signup component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // Can be 'login', 'signup', or 'productList'

  useEffect(() => {
    // Check if the user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentView('productList'); // Show products once logged in
    }
  }, []);

  const handleLogin = (token) => {
    // Store the token and set authentication state
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setCurrentView('productList'); // Show products after login
  };

  const handleLogout = () => {
    // Remove the token and reset authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentView('login'); // Go back to login screen
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <h1>Welcome to the Product Store</h1>

      {/* Conditional rendering based on currentView */}
      {currentView === 'login' && (
        <div>
          <Login handleLogin={handleLogin} />
          <button onClick={() => handleViewChange('signup')}>Don't have an account? Sign Up</button>
        </div>
      )}

      {currentView === 'signup' && (
        <div>
          <Signup handleLogin={handleLogin} />
          <button onClick={() => handleViewChange('login')}>Already have an account? Log In</button>
        </div>
      )}

      {currentView === 'productList' && isAuthenticated && (
        <div>
          <ProductList />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
