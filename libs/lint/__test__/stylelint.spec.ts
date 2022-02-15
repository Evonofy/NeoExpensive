import { writeFile } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';

const shell = promisify(exec);

const stylelint = 'yarn stylelint ./libs/lint';

const createFileFactory = async () => {
  await writeFile(
    `./libs/lint/index.scss`,
    `
                * {
           hello: world;
           color: #FFF000;
        }
    `
  );
};

describe('Stylelint', () => {
  it('should report errors with a scss file', async () => {
    await createFileFactory();
    const script = `${stylelint}/index.scss`;

    try {
      await shell(script);
    } catch (error) {
      type Error = {
        stdout: string;
      };

      const { stdout } = error as Error;

      expect(stdout.includes('property-no-unknown')).toBe(true);
      expect(stdout.includes('indentation')).toBe(true);
      expect(stdout.includes('color-hex-case')).toBe(true);
      expect(stdout.includes('color-no-hex')).toBe(true);
    }
  });

  it('should fix errors with a file', async () => {
    const script = `${stylelint}/index.scss --fix`;

    try {
      const sut = await shell(script);
      console.log(sut);
    } catch (error) {
      type Error = {
        stdout: string;
      };

      const { stdout } = error as Error;

      expect(stdout.includes('property-no-unknown')).toBe(true);
      expect(stdout.includes('color-no-hex')).toBe(true);
    }
  });
});
