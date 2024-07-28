import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserPayload } from 'App/Models/User'
import UserRepository from 'App/Repositories/UserRepository'
import { userRegistration, userLogin } from 'App/Validators/User'

export default class UserController {
  public async login(ctx: HttpContextContract) {
    try {
      const payload = await ctx.request.validate({
        schema: userLogin,
      })
      const userRepo = new UserRepository()
      const token = await userRepo.createToken(ctx, payload as UserPayload)
      return ctx.response.created({ token: token })
    } catch (error) {
      console.log(error)
      if (error.messages === undefined) {
        return ctx.response.badRequest('invalid credentials')
      }
      return ctx.response.badRequest(error.messages)
    }
  }

  public async register(ctx: HttpContextContract) {
    try {
      const payload = await ctx.request.validate({
        schema: userRegistration,
      })

      const userRepo = new UserRepository()
      const user = userRepo.register(payload)
      if ((await user).$isPersisted) {
        const token = await userRepo.createToken(ctx, payload)
        return ctx.response.created({ token: token })
      }
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest(error.messages)
    }
  }
}
