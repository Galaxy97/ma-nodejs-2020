exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('login');
    table.string('password');
    table.uuid('token').defaultTo(knex.raw('uuid_generate_v4()'));
    table.unique(['login', 'password']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
