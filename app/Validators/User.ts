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
})

export { userRegistration, userLogin }
