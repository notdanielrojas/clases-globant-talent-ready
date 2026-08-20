export default {
  paths: ['tests/features/**/*.feature'],

  import: [
    'tests/features/step_definitions/**/*.js',
    'tests/features/support/**/*.js'
  ],

  format: [
    'progress',
    'json:reports/cucumber-report.json'
  ],

  parallel: 1
};