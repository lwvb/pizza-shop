import { ChangeEvent, useState } from 'react';

const useForm = <T>(defaults: T) => {
  const [values, setValues] = useState<T>(defaults);

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const reset = () => setValues(defaults);
  return { values, updateValue, reset };
};

export default useForm;
