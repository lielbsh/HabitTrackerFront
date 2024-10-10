import React from 'react';

const SubmitButton = ({ isSubmitting, text }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 px-4 rounded-full shadow-md transition duration-300 transform ${
        isSubmitting 
          ? 'bg-gray-300 cursor-not-allowed' // Style for when submitting
          : 'bg-mustard text-white hover:bg-pink hover:scale-105'
      }`}
    >
      {isSubmitting ? 'Adding...' : text}
    </button>
  );
};

export default SubmitButton;

