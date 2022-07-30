export default function problems ({ html, state }) {
  if (!Array.isArray(state.store.problems))
    return html``
  let li = msg => `<li>${ msg }</li>`
  let problems = state.store.problems.map(li).join('')
  return html`
  <div>
    <p>Found some problems!</p>
    <ul>${ problems }</ul>
  </div>`
}
