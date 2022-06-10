const validateOnlyStrings = (formError, inputStr, fieldName, minLength) => {
    if(!inputStr.length) {
        return {...formError, isError: false };
    }

    if(minLength && inputStr.length > 0 && inputStr.length < minLength) {
        return {...formError, isError: true, errorMsg: `${fieldName} should be atleast ${minLength} characters long!` };    
    }

    const stringsRegExp = new RegExp(/^[a-z A-Z]+$/);
    return {...formError, isError: stringsRegExp.test(inputStr) ? false: true, errorMsg: `Invalid ${fieldName}! Only alphabetic characters expected. ` };
}

const validateEmail = (formError, email) => {
    if(!email.length) {
        return {...formError, isError: false };
    }

    const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return {...formError, isError: emailRegExp.test(String(email).toLowerCase()) ? false: true, errorMsg: "Invalid Email Address!!" };
}

const validatePassword = (formError, password) => {
    if(!password.length) {
        return {...formError, isError: false };
    }

    const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    return {...formError, isError: passwordRegExp.test(password) ? false: true, errorMsg: "Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 digit and 1 special character" };
}

const validateMobileNo = (formError, mobNo) => {
    if(!mobNo.length) {
        return {...formError, isError: true, errorMsg: "Please add a Mobile No" };
    }

    const mobNoRegExp = new RegExp(/^[0-9]+$/, 'g');
    return {...formError, isError: mobNoRegExp.test(mobNo) && mobNo.length === 10 ? false: true, errorMsg: "Invalid Mobile No!!" };
}

const validateAltMobileNo = (formError, mobNo, altMobNo) => {
    if(mobNo === altMobNo) {
        return {...formError, isError: true, errorMsg: "Alt Mob No cannot be same as Primary Mob No!" };
    }
    return validateMobileNo(formError, altMobNo);  
}

const validatePinCode = (formError, pinCode) => {
    if(!pinCode.length) {
        return {...formError, isError: true, errorMsg: "Please add a Pincode" };
    }

    const pinCodeRegExp = new RegExp(/^[0-9]+$/, 'g');
    return {...formError, isError: pinCodeRegExp.test(pinCode) && pinCode.length === 6 ? false: true, errorMsg: "Invalid Pincode!!" }; 
}

const addressFormValidation = ({ name, city, state, mobile_no, alt_mobile_no, pincode }) => {
    const formError = {
        isError: false,
        errorMsg: ""
    };

    const validationArr = [ {...validateOnlyStrings(formError, name, "name"), field: "name" }, 
                            {...validateMobileNo(formError, mobile_no), field: "mobile_no"}, 
                            {...validatePinCode(formError, pincode), field: "pincode"}, 
                            {...validateOnlyStrings(formError, city), field: "city" }, 
                            {...validateOnlyStrings(formError, state), field: "state" } ];
    
    if(alt_mobile_no.length) {
        validationArr.push({...validateAltMobileNo(formError, mobile_no, alt_mobile_no), field: "alt_mobile_no"});
    }
    return validationArr.reduce((acc, currFormObj) => currFormObj.isError ? [...acc, currFormObj]: [...acc], []);
}

export { validateOnlyStrings, validateEmail, validatePassword, validateMobileNo, validateAltMobileNo, validatePinCode, addressFormValidation };