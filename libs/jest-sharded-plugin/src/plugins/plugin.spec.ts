import { buildJestCommand } from './plugin';

describe('buildJestCommand', () => {
  it('returns jest when no config and no args', () => {
    expect(buildJestCommand('')).toBe('jest');
  });

  it('returns jest with args when no config', () => {
    expect(buildJestCommand('--coverage')).toBe('jest --coverage');
  });

  describe('auto-detects --config flag', () => {
    it('does not add --config for standard jest.config.ts', () => {
      expect(buildJestCommand('', 'jest.config.ts')).toBe('jest');
    });

    it('does not add --config for standard jest.config.js', () => {
      expect(buildJestCommand('', 'jest.config.js')).toBe('jest');
    });

    it('does not add --config for standard jest.config.cjs', () => {
      expect(buildJestCommand('', 'jest.config.cjs')).toBe('jest');
    });

    it('does not add --config for standard jest.config.mjs', () => {
      expect(buildJestCommand('', 'jest.config.mjs')).toBe('jest');
    });

    it('does not add --config for standard jest.config.mts', () => {
      expect(buildJestCommand('', 'jest.config.mts')).toBe('jest');
    });

    it('does not add --config for standard jest.config.cts', () => {
      expect(buildJestCommand('', 'jest.config.cts')).toBe('jest');
    });

    it('adds --config for jest.config-app.js', () => {
      expect(buildJestCommand('', 'jest.config-app.js')).toBe(
        'jest --config jest.config-app.js'
      );
    });

    it('adds --config for jest.ds.config.ts', () => {
      expect(buildJestCommand('', 'jest.ds.config.ts')).toBe(
        'jest --config jest.ds.config.ts'
      );
    });

    it('adds --config for jest.config.ds.ts', () => {
      expect(buildJestCommand('', 'jest.config.ds.ts')).toBe(
        'jest --config jest.config.ds.ts'
      );
    });
  });

  it('returns jest with --config and args when both needed', () => {
    expect(buildJestCommand('--coverage', 'jest.config-app.js')).toBe(
      'jest --config jest.config-app.js --coverage'
    );
  });

  it('handles runTestsByPath args with custom config', () => {
    expect(
      buildJestCommand(
        '--runTestsByPath a.spec.ts b.spec.ts',
        'jest.config-ds.js'
      )
    ).toBe(
      'jest --config jest.config-ds.js --runTestsByPath a.spec.ts b.spec.ts'
    );
  });
});
