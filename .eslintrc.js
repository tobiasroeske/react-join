module.exports = {
  parser: '@typescript-eslint/parser', // Verwende den TypeScript-Parser
  parserOptions: {
    ecmaVersion: 2020, // ECMAScript 2020
    sourceType: 'module', // Für die Verwendung von ES-Modulen
    ecmaFeatures: {
      jsx: true // JSX-Unterstützung
    }
  },
  extends: [
    'eslint:recommended', // Empfohlene ESLint-Regeln
    'plugin:react/recommended', // Empfohlene React-Regeln
    'plugin:@typescript-eslint/recommended', // TypeScript-Regeln
    'plugin:prettier/recommended', // Aktiviert Prettier als ESLint-Plugin
    'prettier' // Deaktiviert Konflikte mit Prettier
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // Überschreibungen für spezifische Regeln
    '@typescript-eslint/no-unused-vars': 'warn', // Zeigt ungenutzte Variablen als Warnung
    'react/react-in-jsx-scope': 'off', // Deaktiviert die Notwendigkeit, React zu importieren
    'prettier/prettier': 'error', // Prettier-Fehler als ESLint-Fehler anzeigen
     'linebreak-style': ['error', 'unix'],
  },
  settings: {
    react: {
      version: 'detect' // Automatische Erkennung der React-Version
    }
  }
}
