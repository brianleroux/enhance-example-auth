import { validate, accounts } from '../../models/accounts.mjs'

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
export async function post (req, fwd) {

  // ensure params valid
  let problems = await validate.read(req.body)
  if (problems) {
    return {
      session: { problems },
      json: { problems },
      location: '/login'
    }
    //return fwd('/login', { problems })
  }

  // looks good! render
  let email = await accounts.read(req.body)
  ///return fwd('/admin', { email })
  return {
    session: { email },
    json: { email },
    location: '/'
  }
}
