import { useQuery } from 'react-query';
import { API_BASE_URL } from '@/services/api';
import { z } from 'zod';

const statusValidator = z.object({
  alive: z.boolean(),
  uptime: z.number(),
  timestamp: z.number(),
});

const getServicesOperational = () => {
  return useQuery('services-status', async () => {
    const response = await fetch(`${API_BASE_URL}/health-check`);
    const data = await response.json();

    return statusValidator.parse(data);
  });
};

export default function Services() {
  const { data, isLoading } = getServicesOperational();

  if (isLoading) {
    return (
      <div>
        <h1>loading status...</h1>
      </div>
    );
  }

  return (
    <div>
      <p>timestamp: {data?.timestamp}</p>
      <p>uptime: {data?.uptime}</p>
    </div>
  );
}
