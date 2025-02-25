import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error-message" role="alert">
      <p>{error.message}</p>
      {error.status && <small>Error code: {error.status}</small>}
    </div>
  );
};

export default ErrorMessage;
