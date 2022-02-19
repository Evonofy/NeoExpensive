import { user } from '@neo/users';
const main = async () => {
  const a = await user.register({
    email: ' ',
    name: '',
  });
  console.log(a);
};
main();
