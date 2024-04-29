import { useState } from 'react';

function useErrors() {
  const [errors, setErrors] = useState([]);

  const addErrors = (newErrors) => {
    const uniqueErrors = Array.from(new Set(newErrors));
    setErrors((prev) =>
      uniqueErrors.reduce((result, error) => {
        if (prev.includes(error)) return prev;
        return [...prev, error];
      }, prev)
    );
  };

  const clearErrors = () => setErrors([]);

  return {
    errors,
    addErrors,
    clearErrors,
  };
}

export default useErrors;
