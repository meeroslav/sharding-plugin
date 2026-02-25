import { getConfigRootDir } from './plugin';
import { resolve, dirname } from 'path';

describe('getConfigRootDir', () => {
  describe('when rootDir is not set', () => {
    it('defaults to the config file directory (matching Jest behavior)', () => {
      const absConfigFilePath = '/workspace/libs/my-lib/jest.config.ts';
      const result = getConfigRootDir({}, absConfigFilePath);
      expect(result).toBe('/workspace/libs/my-lib');
    });
  });

  describe('when rootDir is an absolute path', () => {
    it('uses it as-is', () => {
      const absConfigFilePath = '/workspace/libs/my-lib/jest.config.ts';
      const result = getConfigRootDir(
        { rootDir: '/some/absolute/path' },
        absConfigFilePath
      );
      expect(result).toBe('/some/absolute/path');
    });
  });

  describe('when rootDir is a relative path', () => {
    it('resolves relative to the config file directory', () => {
      const absConfigFilePath = '/workspace/libs/my-lib/jest.config.ts';
      const result = getConfigRootDir(
        { rootDir: '../shared' },
        absConfigFilePath
      );
      expect(result).toBe(resolve('/workspace/libs/my-lib', '../shared'));
    });

    it('resolves "." to the config file directory itself', () => {
      const absConfigFilePath = '/workspace/libs/my-lib/jest.config.ts';
      const result = getConfigRootDir(
        { rootDir: '.' },
        absConfigFilePath
      );
      expect(result).toBe('/workspace/libs/my-lib');
    });

    it('resolves "./src" relative to config file directory', () => {
      const absConfigFilePath = '/workspace/libs/my-lib/jest.config.ts';
      const result = getConfigRootDir(
        { rootDir: './src' },
        absConfigFilePath
      );
      expect(result).toBe(resolve('/workspace/libs/my-lib', './src'));
    });
  });
});
