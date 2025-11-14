import React from 'react';
import '../../styles/shared/ErrorBox.css';

const ErrorBox = ({ message }) => {
  return (
    <div className="error-box">
      <h3>⚠️ Error</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorBox;