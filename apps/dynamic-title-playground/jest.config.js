module.exports = {
  name: 'dynamic-title-playground',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dynamic-title-playground',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
