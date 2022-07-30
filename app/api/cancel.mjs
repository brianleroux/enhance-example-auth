import { accounts } from '../../models/accounts.mjs'

export async function post (req) {

  // not logged in!
  if (!req.session.email) {
    return { location: '/' }
  }

  // remove account, zero the session, send them /
  await accounts.destroy(req.session.email)
  return {
    session: {},
    location: '/'
  }
}
