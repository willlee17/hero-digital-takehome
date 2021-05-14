import React from 'react';

const SuccessPage = ({ message }) => {
  return (
    <h1 className="success__container" aria-label={message}>
      { message }
    </h1>
  )
}

export default SuccessPage;