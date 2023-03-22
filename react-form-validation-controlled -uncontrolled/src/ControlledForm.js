import React, { useRef } from "react";
import { useState } from "react";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "male",
  profession: "",
};
const ControlledForm = () => {
  const [userData, setUserData] = useState(initialData);

  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const firstNameRef = useRef(null);
  const { firstName, lastName, email, gender, profession } = userData;

  // onChange event
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // onSubmit event

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("firstNameRef.current.value", firstNameRef.current.value);
    firstNameRef.current.focus();
    const userErrors = {
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
    };

    let isError = false;
    if (firstName === "") {
      isError = true;
      userErrors.firstName = "FirstName is Required";
    }
    if (lastName === "") {
      isError = true;
      userErrors.lastName = "lastName is Required";
    }

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "" || !regexEmail.test(email)) {
      isError = true;
      userErrors.email = "email is Required and must be valid";
    }

    if (profession === "") {
      isError = true;
      userErrors.profession = "Profession is Required";
    }

    setErrors(userErrors);

    // if (userErrors.values().some((elm) => elm.length > 0)) {
    //   return;
    // }

    if (isError) {
      return;
    }
    // form is valid, now you can Submit form
    // submit form
    setSubmitted(true);
    setUserData(initialData);
  };

  return (
    <div style={{ width: 300, margin: "0 auto" }}>
      {submitted && (
        <h3 style={{ color: "green" }}>Form is submitted successfully</h3>
      )}

      <form action="" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="firstName">FirstName: </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            ref={firstNameRef}
            value={firstName}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors && errors.firstName}</p>
        </div>

        <br />
        <div>
          <label htmlFor="lastName">LastName: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors && errors.lastName}</p>
        </div>

        <br />
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors && errors.email}</p>
        </div>

        <br />
        <div>
          <label htmlFor="gender">Gender: </label>
          <input
            type="radio"
            name="gender"
            id="gender"
            checked={gender === "male"}
            value="male"
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            id="gender"
            checked={gender === "female"}
            value="female"
            onChange={handleChange}
          />
          Female
          <input
            type="radio"
            name="gender"
            id="gender"
            checked={gender === "other"}
            value="other"
            onChange={handleChange}
          />
          Other
        </div>
        <br />

        <div>
          <label htmlFor="profession">Profession:</label>
          <select
            name="profession"
            id="profession"
            value={profession}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="softDev">Software Developer</option>
            <option value="dataScientist">Data Scientist</option>
            <option value="teacher">Teacher</option>
            <option value="devOps">DevOps Engineer</option>
          </select>
          <p style={{ color: "red" }}>{errors && errors.profession}</p>
        </div>

        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ControlledForm;
