import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './EditFormPage.css';

export const EditFormPage = ({ onFormUpdate }) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({ title: '', inputs: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [editingFieldId, setEditingFieldId] = useState(null);
    const [showPlaceholderInput, setShowPlaceholderInput] = useState(false);
    const [placeholderValue, setPlaceholderValue] = useState('');
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const formEditorInputRef = useRef(null);
    const [showInputTypes, setShowInputTypes] = useState(false);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await fetch(`http://localhost:5173/api/forms/${id}`);
                if (!response.ok) {
                    throw new Error('Form not found');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchForm();
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(true);
        setShowPlaceholderInput(false);
        setShowTitleInput(false);
        setPlaceholderValue("");
        if (formEditorInputRef.current) {
            formEditorInputRef.current.focus();
        }
    };

    const handleAddInputClick = () => {
        setShowInputTypes(!showInputTypes);
    };

    const handleAddField = (type) => {
        const newField = { id: Date.now(), type: type, label: type, placeholder: "" };
        setFormData((prevData) => ({
            ...prevData,
            inputs: [...prevData.inputs, newField],
        }));
        setShowInputTypes(false);
    };

    const handleChangeClick = (id) => {
        setEditingFieldId(id);
        console.log("id", id);
        const field = formData.inputs.find(field => field._id === id);
        console.log("field", field);
        setPlaceholderValue(field?.placeholder || ""); 
        setShowPlaceholderInput(true);
        setShowTitleInput(true) ; 
        setTitleValue(field?.title || "") ; 

        if (formEditorInputRef.current) {
            formEditorInputRef.current.focus();
        }
    };

    useEffect(() => {
        console.log("isEditing", isEditing);
    }, [isEditing]);

    const handleInputChange = (e) => {
        if (showPlaceholderInput) {
            setPlaceholderValue(e.target.value);
            console.log("editingFieldId", editingFieldId);
            const updatedFields = formData.inputs.map((field) => {
                if (field._id === editingFieldId) {
                    console.log("pass");
                    return { ...field, placeholder: e.target.value };
                }
                return field;
            });
            console.log("updatedFields", updatedFields);
            setFormData({ ...formData, inputs: updatedFields });
        } else {
            setFormData({ ...formData, title: e.target.value });
        }
    };

    const handleInputChange2 = (e) => {
        if (showTitleInput) {
            setTitleValue(e.target.value);
            console.log("editingFieldId", editingFieldId);
            const updatedFields = formData.inputs.map((field) => {
                if (field._id === editingFieldId) {
                    console.log("pass");

                    return { ...field, title: e.target.value };
                }
                return field;
            });
            console.log("updatedFields", updatedFields);
            
            setFormData({ ...formData, inputs: updatedFields });
        } else {
            setFormData({ ...formData, title: e.target.value });
        }
    };

    const handleSubmit = () => {
        const updatedFields = formData.inputs.map((field) => {
            if (field._id === editingFieldId) {
                return { ...field, placeholder: placeholderValue };
            }
            return field;
        });
        setFormData({ ...formData, inputs: updatedFields });
        setShowPlaceholderInput(false);
        onFormUpdate({ title: formData.title, inputs: formData.inputs });
    };

    const handleDeleteField = (id) => {
        const updatedFields = formData.inputs.filter(field => field._id !== id);
        setFormData({ ...formData, inputs: updatedFields });
    };

    const saveFormToDatabase = async () => {
        try {
            const response = await fetch(`http://localhost:5173/api/forms/${id}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error saving form data');
            }
            alert('Form saved successfully!');
        } catch (error) {
            console.error('Error saving form data:', error);
            alert('Failed to save form.');
        }
    };

    return (
        <div className="container">
            <div className="content">
                <p style={{ fontSize: "35px" }}>Edit Form</p>
                <div className="second-container3">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <h2 style={{ marginBottom: "70px" }}>
                                {formData.title || 'Untitled Form'}
                            </h2>
                            <button className="edit-button" onClick={handleEditClick} style={{ marginBottom: "50px" }}>Edit</button>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            {formData.inputs.length > 0 && (
                                <div style={{ marginTop: "20px" }}>
                                    {formData.inputs.map((field) => (
                                        <div key={field._id} className="input-box-container">
                                            <div className="input-box">
                                                <p style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}>
                                                    {field.title || 'Untitled Field'}
                                                </p>
                                                <button className="edit-button-2" onClick={() => {setIsEditing(false); handleChangeClick(field._id);}}>
                                                    Change
                                                </button>
                                                <button className="delete-button" onClick={() => handleDeleteField(field._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {showInputTypes && (
                            <div style={{ display: "flex", flexDirection: "row", gap: "5px", marginTop: "10px" }}>
                                <button className='input-type-button' onClick={() => handleAddField('Text')}>Text</button>
                                <button className='input-type-button' onClick={() => handleAddField('Number')}>Number</button>
                                <button className='input-type-button' onClick={() => handleAddField('Email')}>Email</button>
                                <button className='input-type-button' onClick={() => handleAddField('Password')}>Password</button>
                                <button className='input-type-button' onClick={() => handleAddField('Date')}>Date</button>
                            </div>
                        )}

                        <button className='add-input-button' onClick={handleAddInputClick} style={{ marginTop: "20px" }}>
                            {showInputTypes ? "Close Add Input" : "Add Input"}
                        </button>

                        <button className="submit-button" onClick={handleSubmit}>Save Changes</button>
                    </div>

                    <div style={{ marginLeft: "50px" }}>
                        <div style={{ marginLeft: "100px" }}>
                            <h2>Form Editor</h2>
                            {!isEditing && !showTitleInput && !showPlaceholderInput && <p>Select to see editor</p>}

                            {isEditing && (
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="input-box-right-side"
                                    ref={formEditorInputRef}
                                    onChange={handleInputChange}
                                    value={formData.title}
                                />
                            )}

                            {showTitleInput && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        
                                        value={titleValue}
                                        onChange={(e) => handleInputChange2(e)}
                                        className="input-box-right-side"
                                    />
                                </div>
                            )}

                            {showPlaceholderInput && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Placeholder"
                                        value={placeholderValue}
                                        onChange={handleInputChange}
                                        className="input-box-right-side"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                    <button className="save-form-button" onClick={saveFormToDatabase}>Save Form</button>
                </div>
            </div>
        </div>
    );
};
