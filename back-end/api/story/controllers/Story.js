'use strict';

/**
 * Story.js controller
 *
 * @description: A set of functions called "actions" for managing `Story`.
 */

module.exports = {

  /**
   * Retrieve story records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.story.search(ctx.query);
    } else {
      return strapi.services.story.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a story record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.story.fetch(ctx.params);
  },

  /**
   * Count story records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.story.count(ctx.query);
  },

  /**
   * Create a/an story record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.story.add(ctx.request.body);
  },

  /**
   * Update a/an story record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.story.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an story record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.story.remove(ctx.params);
  }
};
