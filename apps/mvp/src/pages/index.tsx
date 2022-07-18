import { useQuery } from 'react-query';
import { api } from '@/services/api';
import { z } from 'zod';

const homeValidator = z.object({
  hello: z.string(),
});

const useHomeData = () => {
  return useQuery('hello-world', async () => {
    const response = await api('/');

    return homeValidator.parse(response);
  });
};

export default function Home() {
  const { data } = useHomeData();

  return (
    <div>
      {JSON.stringify(data)}
      <h1>hello world!!!</h1>
    </div>
  );
}
