module.exports = {
  extends: [
    "react-app",
    "airbnb",
    "airbnb/hooks",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  plugins: [
    "jsx-a11y",
    "jest"
  ],
  env: {
    "jest/globals": true,
    "browser": true
  },
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "import/no-extraneous-dependencies": [
      "error",
      { "devDependencies": [".storybook/**", "stories/**", "**/*.stories.jsx"] }
    ]
  }
}