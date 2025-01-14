import React, { useState } from 'react';
import { FiUpload, FiImage } from 'react-icons/fi';

function ProfilePicture() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleRetrieve = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile-picture/${filename}`);
      const data = await response.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error('Retrieval failed', err);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="border border-gray-300 p-2 rounded"
      />
      <button onClick={handleUpload} className="mt-2">
        <FiUpload className="h-5 w-5" />
        Upload
      </button>
      {imageUrl && (
        <div>
          <h2>Profile Picture</h2>
          <img src={imageUrl} alt="Profile Picture" />
          <button onClick={() => handleRetrieve('your-image.jpg')} className="mt-2">
            <FiImage className="h-5 w-5" />
            Retrieve
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePicture;
