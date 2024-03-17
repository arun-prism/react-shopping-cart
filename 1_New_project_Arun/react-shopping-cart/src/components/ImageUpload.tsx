import React, { ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_IMAGE_MUTATION } from "../graphql/mutations";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage, { data, loading, error }] = useMutation(
    UPLOAD_IMAGE_MUTATION
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select the file first");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      // Perform the mutation using Apollo Client
      try {
        const response = await uploadImage({
          variables: {
            file: base64, // The file to upload as a base64 string
          },
        });
        console.log(response.data.uploadImage.url); // Logging the response (URL in this case)
      } catch (e) {
        console.error("An error occurred while uploading the image", e);
      }
    };

    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  // Handle the loading state and error state as necessary
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  return (
    <div>
      <input className="button primary" type="file" onChange={handleChange} />
      <button
        className="button primary"
        onClick={handleUpload}
        disabled={loading}
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
