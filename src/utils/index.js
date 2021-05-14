
// I decided to group some of the bulkier functions into the utils folder  

export const errorChecking = (errorsTemp, formValues) => {
  const { firstName, lastName, email, euResidentSelected, communicationsSelected } = formValues;
    
  //First name and last name 
    if (firstName == '') errorsTemp.firstName = true; 
    if (lastName == '') errorsTemp.lastName = true; 

  // Correct email formating 
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) errorsTemp.email = true; 

  // Making sure EU residence option has been selected 
    if (euResidentSelected == 'Not a EU Resident' || euResidentSelected == ''|| !euResidentSelected.length  ) errorsTemp.euResidentSelected = true;
   

  // Making sure at least one communications option has been selected
    if (!Object.values(communicationsSelected).includes(true)) errorsTemp.communicationsSelected = true;

}

export const encodeString = (formValues) => {
  const encodedString = Object.keys(formValues).map(key => {
    if (key == 'euResidentSelected') {
      return (formValues[key] !== '') ? 'euResident=Yes&' : 'euResident=No&'
    }
    if (key == 'organization') {
      return (formValues[key] !== '') ? 'org=' + formValues[key] + '&' : ''
    }
    if (key == 'communicationsSelected') {
      return Object.keys(formValues['communicationsSelected']).map(comm => {
        if (!!formValues['communicationsSelected'][comm] && comm == 'Other Communications') return 'fieldName=other'
        if (!!formValues['communicationsSelected'][comm]) return `fieldName=${comm.toLowerCase()}`
      }).join('&')
    }
    return key + '=' + formValues[key] + '&'
  }).join('');

  return encodedString; 
}

// Mock API
export const postSubmission = (formValues, errorsTemp) => {
  // turn to query string 
  const queryString = encodeString(formValues)

  return new Promise((resolve, reject) => {
    if (!Object.values(errorsTemp).includes(true)) {
      resolve({ 
        "status": "success", 
        "message": "Thank you. You are now subscribed.",
        "queryString": queryString
       } )
    } else {
      reject({ 
        "status": "error", 
        "message": "Invalid Subscription request." 
      })
    }
  })
}