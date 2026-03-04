import axios from 'axios';
import type { ValidationError } from '../store/auth/types';

export const handleApiError = (error: unknown, defaultMessage = 'Произошла ошибка') => {
  let message = defaultMessage;
  let validationErrors: ValidationError[] = [];

  if (axios.isAxiosError(error) && error.response) {
    const responseData = error.response.data;

    if (error.response.status === 422 && Array.isArray(responseData)) {
      validationErrors = responseData as ValidationError[];
      message = 'Пожалуйста, проверьте правильность введенных данных.';
    } else if (responseData && typeof responseData === 'object' && 'message' in responseData) {
      message = (responseData as { message: string }).message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return { message, validationErrors };
};