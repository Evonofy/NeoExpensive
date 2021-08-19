import { prisma } from '@infra/prisma';

it('should do ok', async () => {
  const user = await prisma.user.findMany();
  console.log(JSON.stringify(user));
});
