import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch('/api/forms');
                const data = await response.json();
                setForms(data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchForms();
    }, []);

    const handleClick = () => {
        navigate('/create');
      };

    const handleViewClick = (id) => {
          navigate(`/form/${id}`) ; 
    }

    const handleEditClick = (id) => {
        navigate(`/form/${id}/edit`) ; 
    }

    const handleDeleteClick = async (id) => {
        console.log(`Received DELETE request for ID: ${id}`); 
        try {
            const response = await fetch(`/api/forms/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setForms(forms.filter(form => form._id !== id));
                console.log('Form deleted successfully');
            } else {
                console.error('Error deleting form');
            }
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

    return (
        <div className='homepage-container'>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h1>Welcome to Form.com</h1>
                    <p>This is a simple form builder</p>
                    <button className='home-page-button' onClick={handleClick}>Create New Form</button>
                    <div className='separator'></div>
                </div>
                <div>
                    <p className="forms-title">Forms</p>
                    <div className="forms-list">
                        {forms.length > 0 ? (
                            forms.map((form) => (
                                <div key={form._id} className="form-item">
                                    <h3 style={{marginLeft:"20px"}}>{form.title}</h3>
                                    <button 
                                        style={{color: "green", border: "none"}} 
                                        onClick={() => handleViewClick(form._id)}>
                                        View
                                    </button>
                                    <button 
                                        style={{color: "blue", border: "none"}} 
                                        onClick={() => handleEditClick(form._id)}>
                                        Edit
                                    </button>
                                    <button 
                                        style={{color: "red", border: "none"}} 
                                        onClick={() => handleDeleteClick(form._id)}>
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No forms available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
