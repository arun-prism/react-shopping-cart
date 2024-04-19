import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ARUN_CREATE_USER_MUTATION } from "../../graphql/mutations";
import "./UserForm.css";
import {useForm, SubmitHandler} from "react-hook-form";
import { styled } from "styled-components";
import {DevTool} from "@hookform/devtools";

type FormData = {
  name: string;
  email: string;
  dob: string;
};

const StyledInput = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

export  const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    dob: "",
  });

  const { register, control } = useForm();
  const [createUser, { data, loading, error }] =
    useMutation(ARUN_CREATE_USER_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ variables: formData });
      alert("User created!");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  return (
    <>
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>

      <label htmlFor="addressline1">Address Line 1:</label>
      <StyledInput {...register("addressline1")} placeholder="75 Samborne Drive" >
   
      
      </StyledInput>
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
    <DevTool control={control}/>
    </>
  );
};
