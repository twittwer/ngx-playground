module.exports = {
  name: 'reactive-title-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/demos/reactive-title-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
