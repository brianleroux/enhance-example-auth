export default function login ({ html }) {
  return html`
    <form-problems></form-problems>
    <form action=/login method=post>
      <input type=email name=email placeholder="enter your email" required>
      <input type=password name=password required>
      <button>login</button>
    </form>
    <script type=module src=/_static/login.mjs></script>
  `
}
