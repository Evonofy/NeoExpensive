import { writeFile } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';

const shell = promisify(exec);

const prettier = 'yarn prettier ./libs/lint';

type createFileFactoryProps = {
  name: string;
};

const createFileFactory = async ({ name }: createFileFactoryProps) => {
  await writeFile(
    `./libs/lint/${name}`,
    `
                const example = "This should fail"
    `
  );
};

describe('Prettier', () => {
  it('should fix errors with a file', async () => {
    await createFileFactory({
      name: 'index.prettier.ts',
    });
    const script = `${prettier}/index.prettier.ts --write`;

    const sut = await shell(script);

    expect(sut.stdout.includes('ms')).toBe(true);
  });
});
