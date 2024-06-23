import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";
import axios from "axios";
import "./SurveyForm.css";

const SurveyForm = () => {
  const [surveyTopic, setSurveyTopic] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const initialFormState = {
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const { formValues, handleChange, handleSubmit } = useForm(
    initialFormState,
    handleFormSubmit
  );

  const { errors, validateForm } = useValidation(formValues, surveyTopic);

  useEffect(() => {
    if (surveyTopic) {
      axios
        .get(`https://api.example.com/questions?topic=${surveyTopic}`)
        .then((response) => {
          setAdditionalQuestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching additional questions", error);
        });
    }
  }, [surveyTopic]);

  function handleFormSubmit() {
    if (validateForm()) {
      alert(JSON.stringify(formValues, null, 2));
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="body">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
            {errors.fullName && <span>{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="form-group3">
            <label>Survey Topic</label>
            <select
              name="surveyTopic"
              value={formValues.surveyTopic}
              onChange={(e) => {
                handleChange(e);
                setSurveyTopic(e.target.value);
              }}
              required
            >
              <option value="">Select Survey Topic</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>
            
            {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
          </div>

          {surveyTopic === "technology" && (
            <>
              <div className="form-group3">
                <label>Favorite Programming Language</label>
                <select
                  name="favoriteLanguage"
                  value={formValues.favoriteLanguage}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Favorite Programming Language</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                </select>
                
                {errors.favoriteLanguage && (
                  <span>{errors.favoriteLanguage}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formValues.yearsOfExperience}
                  onChange={handleChange}
                  required
                />
                <label>Years of Experience</label>
                {errors.yearsOfExperience && (
                  <span>{errors.yearsOfExperience}</span>
                )}
              </div>
            </>
          )}

          {surveyTopic === "health" && (
            <>
              <div className="form-group3">
                <label>Exercise Frequency</label>
                <select
                  name="exerciseFrequency"
                  value={formValues.exerciseFrequency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Exercise Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="rarely">Rarely</option>
                </select>
                
                {errors.exerciseFrequency && (
                  <span>{errors.exerciseFrequency}</span>
                )}
              </div>

              <div className="form-group3">
                <label>Diet Preference</label>
                <select
                  name="dietPreference"
                  value={formValues.dietPreference}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Diet Preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
                
                {errors.dietPreference && <span>{errors.dietPreference}</span>}
              </div>
            </>
          )}

          {surveyTopic === "education" && (
            <>
              <div className="form-group3">
                <label>Highest Qualification</label>
                <select
                  name="highestQualification"
                  value={formValues.highestQualification}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Highest Qualification</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's</option>
                  <option value="masters">Master's</option>
                  <option value="phd">PhD</option>
                </select>
                
                {errors.highestQualification && (
                  <span>{errors.highestQualification}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formValues.fieldOfStudy}
                  onChange={handleChange}
                  required
                />
                <label>Field of Study</label>
                {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <textarea
              name="feedback"
              value={formValues.feedback}
              onChange={handleChange}
              required
              rows="7"
            />
            <label>Feedback</label>
            {errors.feedback && <span>{errors.feedback}</span>}
          </div>

          {additionalQuestions.length > 0 && (
            <div className="additional-questions">
              {additionalQuestions.map((question, index) => (
                <div key={index} className="form-group">
                  <label>{question.label}</label>
                  <input
                    type={question.type}
                    name={question.name}
                    value={formValues[question.name] || ""}
                    onChange={handleChange}
                    required
                  />
                  {errors[question.name] && (
                    <span>{errors[question.name]}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
