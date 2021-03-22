import { useState } from 'react';


export const useForm = (initialState = []) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const quitarElemento = ({ target }) => {

        setValues(
            values.filter(algo => algo !== target.value)
        )
    }
    const handleInputChange = ({ target }) => {

        setValues([
            ...values,
            target.value
        ]);

    }

    return [values, handleInputChange, quitarElemento, reset];

}