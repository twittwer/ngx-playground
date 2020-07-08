const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'reactive-title',
  projectRoot: 'packages/reactive-title',
  buildOutput: 'dist/packages/reactive-title',
});
