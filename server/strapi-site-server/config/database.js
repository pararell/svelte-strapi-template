const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'mysql',
//     connection: {
//       host: env('DATABASE_HOST', 'localhost'),
//       port: env('DATABASE_PORT', 3306),
//       database: env('DATABASE_NAME'),
//       user: env('DATABASE_USER'),
//       password: env('DATABASE_PASSWORD'),
//       options: {
//         useNullAsDefault: true,
//       }
//     },
//     debug: false,
//   },
// });


