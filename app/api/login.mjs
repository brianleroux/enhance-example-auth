import { validate } from '../../models/accounts.mjs'
import { accounts } from '../../models/accounts.mjs'

/** display login form w any problems */
export async function get (req) {
  if (req.session.problems) {
    let { problems, ...session } = req.session
    return {
      session,
      json: { problems }
    }
  }
}

/** login! */
export async function post (req) {
  let problems = await validate.read(req.body)
  if (problems) {
    return {
      session: { problems },
      location: '/login'
    }
  }
  else {
    let email = await accounts.read(req.body)
    if (email) {
      return {
        session: { email },
        location: '/admin'
      }
    }
    else {
      let problems = ['Invalid email or password']
      return {
        session: { problems },
        location: '/login'
      }
    }
  }
}
