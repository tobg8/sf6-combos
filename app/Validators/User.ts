import { schema, rules } from '@ioc:Adonis/Core/Validator'

const userLogin = schema.create({
  email: schema.string([rules.email()]),
  password: schema.string([rules.required()]),
})

const userRegistration = schema.create({
  email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
  password: schema.string([
    rules.confirmed(),
    rules.minLength(7),
    rules.regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/),
  ]),
  username: schema.string([
    rules.alphaNum({
      allow: ['space', 'underscore', 'dash'],
    }),
    rules.required(),
    rules.minLength(3),
    rules.unique({ table: 'users', column: 'username' }),
  ]),
})

export { userRegistration, userLogin }
