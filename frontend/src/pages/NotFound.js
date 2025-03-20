import React from 'react';
import { Link } from 'react-router-dom';
import './Notfound.css'; 

const NotFound = () => {
  return (
    <div>
      
      <div className="container text-center mt-5">
        <h1 className="display-1 text-danger">404</h1> {/* Big font for 404 */}
        <p className="lead">Page Not Found</p> {/* Explanation below 404 */}
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary mt-4">Go Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;

