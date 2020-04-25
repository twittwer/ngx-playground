module.exports = {
  name: 'dynamic-title',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dynamic-title',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
