import { useState } from "react";

const useValidation = (formValues, surveyTopic) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.fullName) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formValues.surveyTopic) {
      newErrors.surveyTopic = "Survey Topic is required";
    }

    if (surveyTopic === "technology") {
      if (!formValues.favoriteLanguage) {
        newErrors.favoriteLanguage = "Favorite Programming Language is required";
      }
      if (!formValues.yearsOfExperience || formValues.yearsOfExperience <= 0) {
        newErrors.yearsOfExperience = "Years of Experience is required and must be greater than 0";
      }
    }

    if (surveyTopic === "health") {
      if (!formValues.exerciseFrequency) {
        newErrors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!formValues.dietPreference) {
        newErrors.dietPreference = "Diet Preference is required";
      }
    }

    if (surveyTopic === "education") {
      if (!formValues.highestQualification) {
        newErrors.highestQualification = "Highest Qualification is required";
      }
      if (!formValues.fieldOfStudy) {
        newErrors.fieldOfStudy = "Field of Study is required";
      }
    }

    if (!formValues.feedback || formValues.feedback.length < 50) {
      newErrors.feedback = "Feedback is required and must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validateForm,
  };
};

export default useValidation;
