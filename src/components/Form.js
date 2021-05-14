import React, { useState, useEffect } from 'react';
import SuccessPage from './SuccessPage';

import { euResident, communications } from '../data';

import { errorChecking, postSubmission } from '../utils';




const Form = () => {
  const [ formValues, setFormValues ] = useState({
    firstName: '',
    lastName: '',
    email: '', 
    organization: '',
    euResidentSelected: [], 
    communicationsSelected: {
      'Advances': false,
      'Alerts': false,
      'Other Communications': false,
    }, 
  })
  
  const errorsTemp = {
    firstName: false,
    lastName: false,
    email: false,
    euResidentSelected: false,
    communicationsSelected: false,
  }

  const [ errors, setErrors ] = useState({
    firstName: false,
    lastName: false,
    email: false,
    euResidentSelected: false,
    communicationsSelected: false
  })

  const [ postSuccess, setPostSuccess ] = useState({
    isSucess: false,
    message: '',
  });




  const handleSubmit = (e) => {
    e.preventDefault();
    // Error check 
    errorChecking(errorsTemp, formValues);

    // If there are errors, return them on top of the page. 
    if (Object.values(errorsTemp).includes(true)) {
      setErrors(errorsTemp)
      return;
    }
    // Else (everything validated), run the API 
    postSubmission(formValues, errorsTemp)
      .then((res) =>{
        setPostSuccess({
          isSucess: true,
          message: 'Thank you. You are now subscribed'
        })
      })
      .catch(err => console.log(err))
  }


  const handleReset = () => {
    setFormValues({
      firstName: '',
      lastName: '',
      email: '', 
      organization: '',
      euResidentSelected: [], 
      communicationsSelected: {
        'Advances': false,
        'Alerts': false,
        'Other Communications': false,
      }, 
    })

    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      euResidentSelected: false,
      communicationsSelected: false
    })
  }

  const handleChange = ({ target: { name, value}}) => {
    setFormValues({
      ...formValues,
       [name]: value
      })
  }

  return (
    <div className="form__container" >
      
      { !!postSuccess.isSucess && <SuccessPage message={postSuccess.message}/> }

      <form className="form" onSubmit={handleSubmit} data-postSuccess={!!postSuccess.isSucess}>
        <h2 className="form__header">Sign up for email updates</h2>
        <p className="form__required">*Indicates Required Field</p>


        {/* General Text Information */}
      <div className="formInput__grid">
        <div className="input__container" aria-labelledby="firstName">
         { errors.firstName && <p className="error" role="alert" id="firstNameError">First name required</p>}
          <label className="formLabel" htmlFor="firstName">FIRST NAME<span aria-hidden="true" >*</span> </label>
          <br />
          <input 
            className="formInput"
            type="text" 
            name="firstName" 
            value={formValues.firstName} 
            data-valid={errors.firstName}
            onChange={e => handleChange(e)} 
            aria-required="true"
            aria-label="first name"
            aria-describedby="firstNameError"
          />
        </div>
     
  
        <div className="input__container">
          { errors.lastName && <p className="error" role="alert" id="lastNameError">Last name required</p>}
          <label  className="formLabel"  htmlFor="lastName">LAST NAME<span aria-hidden="true" >*</span> </label>
          <br />
          <input 
            className="formInput" 
            type="text" 
            name="lastName"  
            data-valid={errors.lastName}
            value={formValues.lastName} 
            onChange={e => handleChange(e)} 
            aria-required="true"
            aria-label="last name"
            aria-describedby="lastNameError"
          />
        </div>

        <div className="input__container">
          { errors.email && <p className="error" role="alert" id="emailError">Must be a valid email</p>}
          <label  className="formLabel" htmlFor="email">EMAIL ADDRESS<span aria-hidden="true" >*</span> </label>
          <br />
          <input 
            className="formInput" 
            type="email" 
            name="email"  
            value={formValues.email} 
            data-valid={errors.email}
            onChange={e => handleChange(e)} 
            aria-required="true"
            aria-label="email"
            aria-describedby="emailError"
          />
        </div>

        <div className="input__container">
          <label  className="formLabel" htmlFor="organization">ORGANIZATION </label>
          <br />
          <input  
            className="formInput"
            type="text" 
            name="organization"  
            value={formValues.organization} 
            onChange={e => handleChange(e)} 
            aria-label="organization"
          />
        </div>
      </div>




        {/* EU Residence Dropdown Selections  */}
      <div className="euResident__container">
        { errors.euResidentSelected && <p className="error" role="alert" id="euError">Must select EU Residence</p>}
        <label  htmlFor="euResidentSelected">EU RESIDENT<span aria-hidden="true" >*</span> </label>
        <br />
        <select
          className="euResident__select" 
          name="euResidentSelected"  
          value={formValues.euResidentSelected} 
          data-valid={errors.euResidentSelected}
          onChange={e => handleChange(e)} 
          aria-required="true"
          aria-label="Select EU Residence"
          aria-describedby="euError"
        >
          <option className="euResident__option">- Select One -</option>
          {
            euResident.map((country, index) => (
              <option value={country} aria-label={country}>{country}</option>
            ))
          }
        </select>
      </div>


      {/* Communications Checkboxes   */}
      
      { errors.communicationsSelected && <p className="error__checkbox" role="alert" id="commsError">Must select at least one communications option</p>}
      <div className="checkbox__container">
      
      {
        communications.map((communication, index) => (
          <div className="checkbox__label__container">
            <input 
              className="checkbox" 
              type="checkbox" 
              name={communication} 
              value={communication} 
              checked={formValues.communicationsSelected[communication]}
              onChange={e => setFormValues((prevState) => {
               const updatedSelections = prevState.communicationsSelected;
               updatedSelections[communication] = e.target.checked;
                return ({
                  ...prevState,
                  communicationsSelected: updatedSelections
                })
              })}
              aria-label={communication}
              aria-describedby="commsError"
            />
            <label  className="formLabel" htmlFor={communication} >{communication.toUpperCase()} </label>
          </div>
        ))
      }
  
      </div>
  
      {/* Buttons */}
      <div className="buttons__container">
        <button className="button--submit">SUBMIT</button>
        <button type="button" className="button--reset" onClick={handleReset}>RESET</button>
      </div>
     
    </form>
    </div>
  )
}

export default Form; 