import React, { useState } from 'react';
import './CreateForm.css';
import { useRef } from 'react';

export const CreateForm = () => {
    const[isEditing,setIsEditing] = useState(false) ; 
    const[formTitle,setFormTitle] = useState('Untitled Form') ; 
    const formEditorInputRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true); 
        if (formEditorInputRef.current) {
            formEditorInputRef.current.focus();
        }
    }

    const handleInputChange = (e) => {
        setFormTitle(e.target.value)
    }

    console.log(isEditing) ;
    console.log(formTitle) ; 

  return (
    <div className='container'>
        <div className='content'>
            <p style={{fontSize : "35px"}}>Create New Form</p>
           <div className='second-container'>
                <div>
                <div style={{ display: "flex" }}>
                    {isEditing && formTitle && formTitle !== 'Untitled Form' ? (
                        <h2>{formTitle}</h2> 
                    ) : (
                        <h2 style={{ marginBottom: "70px" }}>Untitled Form</h2> 
                    )}
                    <button className='edit-button' onClick={handleEditClick}>Edit</button>
                </div>


                    <div style = {{display : "flex", flexDirection:"column" , alignItems: "center"}}>
                            <button className='add-input-button'>Add Input</button>
                            <button className='submit-button'>SUBMIT</button>
                    </div>
                </div>
                <div style={{marginLeft:"50px"}}>
                     <div style={{marginLeft:"100px"}}>
                        <h2>Form Editor</h2>
                        <input 
                            type="text" 
                            placeholder='Title' 
                            className='input-box'  
                            ref={formEditorInputRef}
                            onChange={handleInputChange} 
                        />
                     </div>
                </div>
           </div>
           <button className='create-form-button'>CREATE FORM</button>
        </div>
    </div>
   
  );
};

export default CreateForm;
