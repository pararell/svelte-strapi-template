module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fbd4247a07b51e5bbaee52f2dc25f40e'),
  },
});
