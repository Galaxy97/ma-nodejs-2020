exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('login');
    table.string('password');
    table.uuid('token');
    table.unique(['login', 'password']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
