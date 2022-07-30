// logged in, share email w page
export async function get (req) {
  if (req.session.email) {
    return {
      json: { email: req.session.email }
    }
  }
}
