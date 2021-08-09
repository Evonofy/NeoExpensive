import { api } from '../../services';

describe('axios api testing', () => {
  it('should make a call to a url in testing mode', async () => {
    const { data } = await api.get('/users');

    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('login');
    expect(data[0]).toHaveProperty('node_id');
  });
});
