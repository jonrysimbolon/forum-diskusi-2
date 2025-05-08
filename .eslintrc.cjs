module.exports = {
  extends: [
    'airbnb',
    'plugin:react-hooks/recommended',
    'plugin:js/recommended', // menambahkan ini
    'plugin:react/recommended', // ini diubah menjadi rekomendasi dari plugin React
    'plugin:react/configs/flat/recommended', // menambahkan ini
    'plugin:cypress/recommended', // menambahkan ini
  ],
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true, // Menambahkan environment Cypress
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react-refresh',
    'js', // menambahkan plugin js jika belum ada
    'react', // menambahkan plugin react jika belum ada
    'cypress', // menambahkan plugin cypress
  ],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': 'off',
    'react/jsx-uses-react': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-alert': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': ['error', { code: 140 }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
  overrides: [
    {
      files: ['src/components/ThreadDetailContent.jsx'],
      rules: {
        'react/no-danger': 'off',
      },
    },
    {
      files: ['vite.config.js'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
    {
      files: ['**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
      rules: {
        'no-underscore-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
