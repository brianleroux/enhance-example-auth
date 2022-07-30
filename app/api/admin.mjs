export async function get (req) {
  if (req.session.email) {
    // logged in, share email w page
    return {
      json: { email: req.session.email }
    }
  }
  else {
    // not logged in!
    return { location: '/' }
  }
}
