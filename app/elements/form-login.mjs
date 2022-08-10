/** browser client component logic */
export let component = {
  tag : 'el-tagoo',

  async login () {
    try {
      await api.post(this.form)
    }
    catch (e) {
      console.log('form-login error', e)
    }
  }
}

/** shared template logic */
export function render ({ html }) {
  return html`
    <form-login-problems></form-login-problems>
    <form action=/login method=post onsubmit=login>
      <input type=email name=email placeholder="enter your email">
      <input type=password name=password>
      <button>login</button>
    </form>
    <script type=module src=/_static/forms.mjs></script>
  `
}
