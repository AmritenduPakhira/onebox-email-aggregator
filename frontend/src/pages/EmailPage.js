import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/emails/${id}`);
        setEmail(response.data);
      } catch (err) {
        setError('Failed to fetch email');
      }
    };

    fetchEmail();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!email) return <div className="text-secondary">Loading...</div>;

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section with Back to Dashboard Button */}
      <header className="bg-primary text-white py-4 d-flex justify-content-between align-items-center px-5">
        <h1>Welcome to Onebox Gmail - {id}</h1>
        <button className="btn btn-light" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </header>

      {/* Email Details Section */}
      <div className="container mt-5 p-5 bg-white rounded shadow">
        <h2>{email.subject}</h2>
        <p className="text-muted">From: {email.from}</p>
        <p className="text-muted">Date: {new Date(email.date).toLocaleString()}</p>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: email.body }} />
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>© {new Date().getFullYear()} Amritendu (2110994839). All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default EmailPage;
