export default function register ({ html, state }) {
  let form = state.store?.problems?.['form-register']
  return html`
<h1>Register</h1>
<form-register-problems></form-register-problems>
<form action=/register method=post>
  <div>
    <label for=email>email</label>
    <input type=email name=email value="${form?.values.email || ''}" placeholder="enter your email">
  </div>
  <div>
    <label for=password>password</label>
    <input type=password name=password>
  </div>
  <div>
    <label for=confirm>confirm password</label>
    <input type=password name=confirm>
  </div>
  <button>register account</button>
</form>
<script type=module src=/_static/forms.mjs></script>
  `
}
