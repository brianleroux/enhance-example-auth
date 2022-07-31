import { validate } from '../../models/accounts.mjs'
import { accounts } from '../../models/accounts.mjs'

/** display login form w any problems */
export async function get (req) {
  if (req.session.email) { 
    return { location: '/admin' } 
  }
  if (req.session.problems) {
    let { problems, ...session } = req.session
    return {
      session,
      json: { problems }
    }
  }
}

/** login! */
export async function post (req, render) {
  // ensure params valid
  let problems = await validate.read(req.body)
  if (problems) {
    return {
      location: '/login',
      session: { problems },
      json: { problems },
    }
  }
  // ensure account exists
  let email = await accounts.read(req.body)
  if (!email) {
    let problems = ['Invalid email or password']
    return {
      location: '/login',
      session: { problems },
      json: { problems },
    }
  }
  // looks good! render
  let location = '/admin'
  let session = { email }
  let res = await render(location, session)
  return {
    location,
    session,
    json: { location, ...res },
  }
}
