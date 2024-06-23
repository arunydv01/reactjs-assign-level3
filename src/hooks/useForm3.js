import { useState } from "react";

const useForm3 = (initialState, submitCallback) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback();
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
  };
};

export default useForm3;
