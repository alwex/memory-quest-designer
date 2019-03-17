'use strict';

/**
 * Battle.js controller
 *
 * @description: A set of functions called "actions" for managing `Battle`.
 */

module.exports = {

  /**
   * Retrieve battle records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.battle.search(ctx.query);
    } else {
      return strapi.services.battle.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a battle record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.battle.fetch(ctx.params);
  },

  /**
   * Count battle records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.battle.count(ctx.query);
  },

  /**
   * Create a/an battle record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.battle.add(ctx.request.body);
  },

  /**
   * Update a/an battle record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.battle.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an battle record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.battle.remove(ctx.params);
  }
};
