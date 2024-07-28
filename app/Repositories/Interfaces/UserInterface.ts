import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User, { UserPayload } from 'App/Models/User'

export default interface UserInterface {
  register(payload: UserPayload): Promise<User>
  createToken(ctx: HttpContextContract, payload: UserPayload): Promise<OpaqueTokenContract<User>>
}
