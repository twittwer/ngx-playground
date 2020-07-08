module.exports = {
  name: 'reactive-title',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/packages/reactive-title',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
