import React, { useState } from "react";
import useForm2 from "../../hooks/useForm2";
import useValidation2 from "../../hooks/useValidation2";
import "./JobApplicationForm.css";

const JobApplicationForm = () => {
  const [position, setPosition] = useState("");
  const initialFormState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: {
      javascript: false,
      css: false,
      python: false,
    },
    interviewTime: "",
  };

  const { formValues, handleChange, handleCheckboxChange, handleSubmit } =
    useForm2(initialFormState, handleFormSubmit);
  const { errors, validateForm } = useValidation2(formValues, position);

  function handleFormSubmit() {
    alert(JSON.stringify(formValues, null, 2));
  }

  function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      handleSubmit();
    }
  }

  return (
    <div className="form-container">
      <div className="h1-tag">
        <h1>Form Level 2</h1>
      </div>
      <div className="div-body">
        <form onSubmit={onSubmit}>
          <div className="body2">
            <div className="form-group-2">
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

            <div className="form-group-2">
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

            <div className="form-group-2">
              <input
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                required
              />
              <label>Phone Number</label>
              {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>

            <div className="form-group-21">
              <label>Applying for Position</label>
              <select
                name="position"
                value={formValues.position}
                onChange={(e) => {
                  handleChange(e);
                  setPosition(e.target.value);
                }}
                required
              >
                <option value="">Select Position</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>

              {errors.position && <span>{errors.position}</span>}
            </div>

            {(position === "developer" || position === "designer") && (
              <div className="form-group-2">
                <input
                  type="number"
                  name="relevantExperience"
                  value={formValues.relevantExperience}
                  onChange={handleChange}
                  required
                />
                <label>Relevant Experience (years)</label>
                {errors.relevantExperience && (
                  <span>{errors.relevantExperience}</span>
                )}
              </div>
            )}

            {position === "designer" && (
              <div className="form-group-2">
                <input
                  type="text"
                  name="portfolioUrl"
                  value={formValues.portfolioUrl}
                  onChange={handleChange}
                  required
                />
                <label>Portfolio URL</label>
                {errors.portfolioUrl && <span>{errors.portfolioUrl}</span>}
              </div>
            )}

            {position === "manager" && (
              <div className="form-group-2">
                <input
                  type="text"
                  name="managementExperience"
                  value={formValues.managementExperience}
                  onChange={handleChange}
                  required
                />
                <label>Management Experience</label>
                {errors.managementExperience && (
                  <span>{errors.managementExperience}</span>
                )}
              </div>
            )}

            <div className="form-group-22">
              <label>Additional Skills</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="javascript"
                    checked={formValues.additionalSkills.javascript}
                    onChange={handleCheckboxChange}
                  />
                  JavaScript
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="css"
                    checked={formValues.additionalSkills.css}
                    onChange={handleCheckboxChange}
                  />
                  CSS
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="python"
                    checked={formValues.additionalSkills.python}
                    onChange={handleCheckboxChange}
                  />
                  Python
                </label>
              </div>
              {errors.additionalSkills && (
                <span>{errors.additionalSkills}</span>
              )}
            </div>

            <div className="form-group-2">
              <input
                type="datetime-local"
                name="interviewTime"
                value={formValues.interviewTime}
                onChange={handleChange}
                required
              />
              <label>Preferred Interview Time</label>
              {errors.interviewTime && <span>{errors.interviewTime}</span>}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
