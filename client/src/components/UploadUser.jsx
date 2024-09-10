import  { useState } from 'react';
import axios from 'axios';

const UploadUsers = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('excel', file);

    try {
      await axios.post('http://localhost:8080/api/users/upload-users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Users imported successfully');
    } catch (error) {
      setMessage('Error uploading file', error);
    }
  };

  return (
    <div className='bg-blue-50 py-5 rounded flex items-center flex-col mt-5'>
      <h2 className='my-3 text-xl text-center text-blue-500'>Upload Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" className='outline-none' accept=".xlsx,.xls" onChange={handleFileChange} />
        <button type="submit" className='bg-green-500 px-4 py-1 rounded text-white'>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadUsers;
