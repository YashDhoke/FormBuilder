import React, { useState } from 'react';
import './FormDetailPage.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const FormDetailPage = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await fetch(`/api/forms/${id}`);
                if (!response.ok) {
                    throw new Error('Form not found');
                }
                const data = await response.json();
                setForm(data);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [id]);

    if (!form) {
        return <p>Loading form...</p>;
    }

    return (
        <div className='form-detail-page'>
            <div style={{display:"flex", flexDirection:"column" , alignItems : "center"}}>
              <h1>{form.title}</h1>
              <div>
                  {form.inputs && form.inputs.length > 0 ? (
                      form.inputs.map((input, index) => (
                          <div key={index} style={{ marginBottom: '20px'}}>
                              <InputField input={input} />
                          </div>
                      ))
                  ) : (
                      <p>No inputs available</p>
                  )}
              </div>
              <button className='form-button'>Submit</button>
            </div>
        </div>
    );
};

const InputField = ({ input }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (value === '') {
            setIsFocused(false);
        }
    };

    return (
        <div className="input-container" style={{ position: 'relative' }}>
            <label className={`input-label ${isFocused || value ? 'focused' : ''}`}>
                {isFocused ? input.placeholder : input.title}
            </label>
            <input
                type="text"
                value={value}
                placeholder={input.placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setValue(e.target.value)}
                className="input-field"
            />
        </div>
    );
};
