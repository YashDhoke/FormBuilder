import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FormDetailPage.css'

export const FormDetailPage = () => {
    const { id } = useParams(); 
    const [form, setForm] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(null); 
    const [inputValues, setInputValues] = useState({}); 

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await fetch(`http://localhost:5173/api/forms/${id}`);
                if (!response.ok) {
                    throw new Error('Form not found');
                }
                const data = await response.json();
                setForm(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [id]);

    const handleSubmit = () => {
      
        console.log(inputValues);

        alert('Form submitted! Check the console for the submitted data.');
    };

    const handleInputChange = (index, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [index]: value
        }));
    };

    if (loading) {
        return <p>Loading form...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="form-detail-page">
            <div className = "second-container2" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>{form.title}</h1>
                <div>
                    {form.inputs && form.inputs.length > 0 ? (
                        form.inputs.map((input, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                                <label>{input.title}</label>
                                <InputField 
                                    title={input.title}
                                    placeholder={input.placeholder}
                                    value={inputValues[index] || ""}
                                    onChange={(value) => handleInputChange(index, value)}
                                    isFocused={focusedIndex === index}
                                    onFocus={() => setFocusedIndex(index)}
                                    onBlur={() => setFocusedIndex(null)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No inputs available for this form</p>
                    )}
                </div>
                <button className='form-button' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

const InputField = ({ title, placeholder, value, onChange, isFocused, onFocus, onBlur }) => {
    return (
        <input
            type="text"
            value={value}
            placeholder={isFocused ? placeholder : title}
            onFocus={() => {
                if (value === title) onChange(''); 
                onFocus();
            }}
            onBlur={() => {
                if (value === '') onChange(title); 
                onBlur();
            }}
            onChange={(e) => onChange(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
    );
};
