import React, { useState, useRef } from 'react';
import './CreateForm.css';

export const CreateForm = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [showInputTypes, setShowInputTypes] = useState(false);
    const [inputFields, setInputFields] = useState([]); 
    const [editingFieldId, setEditingFieldId] = useState(null); 
    const formEditorInputRef = useRef(null);
    const [showPlaceholderInput, setShowPlaceholderInput] = useState(false);
    const [placeholderValue, setPlaceholderValue] = useState("");
    const [inputFieldValues, setInputFieldValues] = useState({});

    const handleEditClick = () => {
        setIsEditing(true);
        setPlaceholderValue(""); 
        if (formEditorInputRef.current) {
            formEditorInputRef.current.focus(); 
        }
        setShowPlaceholderInput(false);
    };

    const handleChangeClick = (id) => {
        setShowPlaceholderInput(true);  
        setEditingFieldId(id);          
        setPlaceholderValue("");       
    
        if (formEditorInputRef.current) {
            formEditorInputRef.current.value = ''; 
        }
    
        if (formEditorInputRef.current) {
            formEditorInputRef.current.focus();
        }
    };

    const handleInputChange = (e) => {
        if (showPlaceholderInput) {
            const updatedFields = inputFields.map((field) => {
                if (field.id === editingFieldId) {
                    return { ...field, label: e.target.value }; 
                }
                return field;
            });
            setInputFields(updatedFields); 

            setInputFieldValues((prevValues) => ({
                ...prevValues,
                [editingFieldId]: e.target.value,
            }));
        } else {
            setFormTitle(e.target.value);
        }
    };

    const handleAddInputClick = () => {
        setShowInputTypes(!showInputTypes);
    };

    const handleAddField = (type) => {
        const newField = { id: Date.now(), type: type, label: type }; 
        setInputFields((prevFields) => [...prevFields, newField]);
        setInputFieldValues((prevValues) => ({
            ...prevValues,
            [newField.id]: "" 
        }));

        setShowInputTypes(false);
    };

    const handleDeleteField = (id) => {
        setInputFields((prevFields) => prevFields.filter(field => field.id !== id));
        
        setInputFieldValues((prevValues) => {
            const newValues = { ...prevValues };
            delete newValues[id];
            return newValues;
        });
    };

    const handleFieldChange = (e, id) => {
        const updatedFields = inputFields.map((field) => {
            if (field.id === id) {
                return { ...field, value: e.target.value };
            }
            return field;
        });
        setInputFields(updatedFields);
        
        setInputFieldValues((prevValues) => ({
            ...prevValues,
            [id]: e.target.value 
        }));
    };

    return (
        <div className='container'>
            <div className='content'>
                <p style={{ fontSize: "35px" }}>Create New Form</p>
                <div className='second-container'>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {isEditing && formTitle && formTitle !== 'Untitled Form' ? (
                                <h2>{formTitle}</h2>
                            ) : (
                                <h2 style={{ marginBottom: "70px" }}>Untitled Form</h2>
                            )}
                            <button className='edit-button' onClick={handleEditClick} style={{ marginBottom: "50px" }}>Edit</button>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            {inputFields.length > 0 && (
                                <div style={{ marginTop: "20px" }}>
                                    {inputFields.map((field) => (
                                        <div key={field.id} className="input-box-container">
                                            <div className="input-box">
                                                <p>{field.label}</p>
                                                <button className="edit-button-2" onClick={() => handleChangeClick(field.id)}>
                                                    Change
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDeleteField(field.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className='add-input-button' onClick={handleAddInputClick}>
                            {showInputTypes ? "Close Add Input" : "Add Input"}
                        </button>

                        {showInputTypes && (
                            <div style={{ display: "flex", flexDirection: "row", gap: "5px", marginTop: "10px" }}>
                                <button className='input-type-button' onClick={() => handleAddField('Text')}>Text</button>
                                <button className='input-type-button' onClick={() => handleAddField('Number')}>Number</button>
                                <button className='input-type-button' onClick={() => handleAddField('Email')}>Email</button>
                                <button className='input-type-button' onClick={() => handleAddField('Password')}>Password</button>
                                <button className='input-type-button' onClick={() => handleAddField('Date')}>Date</button>
                            </div>
                        )}

                        <button className='submit-button'>SUBMIT</button>
                    </div>

                    <div style={{ marginLeft: "50px" }}>
                        <div style={{ marginLeft: "100px" }}>
                            <h2>Form Editor</h2>
                            <input
                                type="text"
                                placeholder='Title'
                                className='input-box-right-side'
                                ref={formEditorInputRef}
                                onChange={handleInputChange}
                            />
                            {showPlaceholderInput && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Placeholder"
                                        value={placeholderValue}
                                        onChange={(e) => setPlaceholderValue(e.target.value)}
                                        className="input-box-right-side"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button className="create-form-button">Create Form</button>
                </div>
            </div>
        </div>
    );
};
