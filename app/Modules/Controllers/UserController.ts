import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { userRegistration, userLogin } from 'App/Validators/User'
import User from 'App/Models/User'

export default class UserController {
  public async login(ctx: HttpContextContract) {
    try {
      const payload = await ctx.request.validate({
        schema: userLogin,
      })
      const token = await ctx.auth.use('api').attempt(payload.email, payload.password)
      return token
    } catch (error) {
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

      const user = new User()
      console.log(payload)
      user.email = payload.email
      user.password = payload.password
      await user.save()

      if (user.$isPersisted) {
        const token = await ctx.auth.use('api').attempt(payload.email, payload.password)
        return ctx.response.created({ token: token })
      }
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest(error.messages)
    }
  }
}
