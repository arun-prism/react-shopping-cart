import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../graphql/mutations";
import "./UserForm.css";

type FormData = {
  name: string;
  email: string;
  dob: string;
};

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    dob: "",
  });
  const [createUser, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);

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
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};
