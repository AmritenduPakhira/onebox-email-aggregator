import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; 

const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/emails');
        setEmails(response.data);
        setFilteredEmails(response.data);  
      } catch (err) {
        setError('Failed to fetch emails');
      }
    };

    fetchEmails();
  }, []);


  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredEmails(emails);  
    } else {
      const filtered = emails.filter((email) => {
        const emailDate = new Date(email.date).toLocaleDateString(); 
        return (
          email.subject.toLowerCase().includes(query) ||
          email.from.toLowerCase().includes(query) ||
          emailDate.includes(query) // Compare the date string
        );
      });
      setFilteredEmails(filtered);  // Update filtered emails based on search
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="min-vh-100 bg-light">
      
      <header className="bg-secondary bg-gradient text-white py-4 text-center">
        <h1>Welcome to Onebox Gmail Dashboard</h1>
      </header>

     
      <div className="container my-5">
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by subject, sender, or date..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

    
      <div className="container my-5">
        <h2 className="mb-4">Your Emails</h2>
        {filteredEmails.length === 0 ? (
          <p>No emails match your search criteria.</p>
        ) : (
          <div className="email-grid">
            {filteredEmails.map((email) => (
              <div
                key={email._id}
                className="email-item"
                onClick={() => navigate(`/emails/${email._id}`)}
              >
                <h5>{email.subject}</h5>
                <p className="mb-1">From: {email.from}</p>
                <small>{new Date(email.date).toLocaleString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>

     
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>© {new Date().getFullYear()} Amritendu (2110994839). All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
