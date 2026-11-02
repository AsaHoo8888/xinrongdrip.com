import * as migration_20261031_203714_initial from './20261031_203714_initial';

export const migrations = [
  {
    up: migration_20261031_203714_initial.up,
    down: migration_20261031_203714_initial.down,
    name: '20261031_203714_initial'
  },
];
