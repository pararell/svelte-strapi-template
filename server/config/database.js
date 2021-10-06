module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});

// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: "mysql",
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'strapi_db'),
//         username: env('DATABASE_USERNAME', 'miro218'),
//         password: env('DATABASE_PASSWORD', '123456i'),
//       },
//       options: {
//         useNullAsDefault: true,
//       },
//     },
//   }
// });