import { useMutation } from '@tanstack/react-query';
import { API_DOMAIN } from '@/config/const';

interface ContactFormData {
  service: string[];
  budget: string;
  timeframe: string;
  details: string;
  name: string;
  email: string;
  type: string;
  companyName?: string;
  projectName: string;
  projectLink?: string;
  from?: string;
}

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
}

export const useSubmitContactForm = () => {
  return useMutation<ApiResponse, Error, ContactFormData>({
    mutationFn: async (data) => {
      const res = await fetch(`${API_DOMAIN}/submit-contact-form.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      const result = await res.json();
      return result as ApiResponse;
    },
  });
};
