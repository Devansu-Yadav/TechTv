import { useState, useContext, createContext } from 'react';

const FormErrorContext = createContext({
    formDataErr: "",
    setFormDataErr: () => {},
    isFormError: false,
    setIsFormError: () => {},
    errorFormField: "",
    setErrorFormField: () => {}
});

const useFormError = () => useContext(FormErrorContext);

const FormErrorProvider = ({ children }) => {
    const [formDataErr, setFormDataErr] = useState("");
    const [isFormError, setIsFormError] = useState(false);
    const [errorFormField, setErrorFormField] = useState("");

    return (
        <FormErrorContext.Provider value={{ formDataErr, setFormDataErr, isFormError, setIsFormError, errorFormField, setErrorFormField }}>
            { children }
        </FormErrorContext.Provider>
    );
}

export { useFormError, FormErrorProvider };