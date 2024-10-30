// src/utils/errorHandler.js
import Swal from 'sweetalert2';

export const handleError = (error) => {
  const status = error.response ? error.response.status : null;
  
  let title = 'Error';
  let text = 'An unexpected error occurred. Please try again.';

  if (status === 404) {
    title = '404 Not Found';
    text = 'The requested resource was not found.';
  } else if (status === 500) {
    title = '500 Internal Server Error';
    text = 'There was an error on the server. Please try again later.';
  } else if (status === 400) {
    title = 'Bad Request';
    text = 'There was an error with your request. Please check your input.';
  }

  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
  });
};
