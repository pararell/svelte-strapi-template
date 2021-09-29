module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST'),
      port: env('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: env('SMTP_USERNAME'),
        pass: env('SMTP_PASSWORD'),
      },
      tls: {
				rejectUnauthorized: false
			}
    },
    settings: {
      defaultFrom: 'email@miroslavsmrtic.sk',
      defaultReplyTo: 'email@miroslavsmrtic.sk',
    },
  },
});