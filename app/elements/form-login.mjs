/** shared template logic */
export default function login ({ html }) {
  return html`
    <form-login-problems></form-login-problems>
    <form action=/login method=post>
      <input type=email name=email placeholder="enter your email">
      <input type=password name=password>
      <button>login</button>
    </form>
    <script type=module src=/_static/forms.mjs></script>
  `
}
