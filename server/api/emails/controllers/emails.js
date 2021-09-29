/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const { sanitizeEntity } = require('strapi-utils');

 module.exports = {
  async create(ctx) {
    let entity;
    entity = await strapi.services.emails.create(ctx.request.body);
    
    entity = sanitizeEntity(entity, { model: strapi.models.emails });

    if (entity.email) {
      // send an email by using the email plugin
      await strapi.plugins['email'].services.email.send({
        to: entity.email,
        from: 'mail.miroslavsmrtic.sk',
        subject: 'Contact email',
        text: `
          Content:
          ${entity.note}
        `,
      });
    }

    return entity;
  },
}
