import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  dts: true,
  publint: true,
  attw: {
    profile: 'node16',
    level: 'error',
  },
  format: ['esm', 'cjs'],
  entry: 'src/index.ts',
})
