require('dotenv').config();

module.exports = {
  schema: 'http://localhost:9000/graphql',
  documents: ['src/graphql/**/*.graphql'],
  overwrite: true,
  generates: {
    'src/graphql/graphql-types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
};
