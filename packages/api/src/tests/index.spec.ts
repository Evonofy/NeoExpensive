import { api } from '@src/services';

it('should sum two number', async () => {
  const { data } = await api.get('/users');
  console.log(data);
  expect(1 + 1).toBe(2);
});
