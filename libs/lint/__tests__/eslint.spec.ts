import { writeFile } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';

const shell = promisify(exec);

const eslint = 'yarn eslint ./libs/lint';

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

describe('ESLint', () => {
  it('should report errors with a typescript file', async () => {
    await createFileFactory({ name: 'index.eslint.ts' });
    const script = `${eslint}/index.eslint.ts`;

    try {
      await shell(script);
    } catch (error) {
      type Error = {
        stdout: string;
      };

      const { stdout } = error as Error;

      expect(stdout.includes('no-unused-vars')).toBe(true);
      expect(stdout.includes('Replace')).toBe(true);
      expect(stdout.includes('Delete')).toBe(true);
    }
  });

  it('should report errors with a javascript file', async () => {
    await createFileFactory({ name: 'index.eslint.js' });
    const script = `${eslint}/index.eslint.js`;

    try {
      await shell(script);
    } catch (error) {
      type Error = {
        stdout: string;
      };

      const { stdout } = error as Error;

      expect(stdout.includes('no-unused-vars')).toBe(true);
      expect(stdout.includes('Replace')).toBe(true);
      expect(stdout.includes('Delete')).toBe(true);
    }
  });

  it('should fix errors with a file', async () => {
    const script = `${eslint}/index.eslint.ts --fix`;

    try {
      const sut = await shell(script);
      console.log(sut);
    } catch (error) {
      type Error = {
        stdout: string;
      };

      const { stdout } = error as Error;

      expect(stdout.includes('no-unused-vars')).toBe(true);
    }
  });
});
