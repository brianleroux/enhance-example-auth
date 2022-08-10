import { validate } from '../../models/accounts.mjs'
import { accounts } from '../../models/accounts.mjs'

/** passes any problems to the reg form */
export async function get (req) {
  if (req.session.problems) {
    let { problems, ...session } = req.session
    return {
      session,
      json: { problems }
    }
  }
}

/** registers an account */
export async function post (req, fwd) {
  // validate registration payload
  let problems = await validate.create(req.body)
  if (problems) {
    return fwd('/register', { problems })
  }
  // no problems! attempt to create account
  try {
    let email = await accounts.create(req.body)
    return fwd('/admin', { email })
  }
  catch (e) {
    // unforseen problems! still fail gracefully
    return fwd('/register', {
      problems: [{ message: 'server failure' + e.message }] 
    })
  }
}
