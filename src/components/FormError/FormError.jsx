import './FormError.css';
import { useFormError } from 'common/context';

const FormError = () => {
    const { formDataErr } = useFormError();

    return (
        <div className='form-error'>{ formDataErr }</div>
    );
}

export { FormError };