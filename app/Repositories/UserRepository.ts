import User, { UserPayload } from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserInterface from './Interfaces/UserInterface'
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'

export default class UserRepository implements UserInterface {
  public async register(payload: UserPayload): Promise<User> {
    const user = new User()

    user.email = payload.email
    user.password = payload.password
    user.username = payload.username
    await user.save()
    return user
  }

  public async createToken(
    ctx: HttpContextContract,
    payload: UserPayload
  ): Promise<OpaqueTokenContract<User>> {
    return await ctx.auth.use('api').attempt(payload.email, payload.password)
  }
}
