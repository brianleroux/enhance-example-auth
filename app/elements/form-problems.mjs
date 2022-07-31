export default function problems ({ html, state }) {
  let display = state.store.problems?.length > 0? 'block' : 'none'
  let li = msg => `<li>${ msg }</li>`
  let problems = state.store.problems?.map(li).join('')
  return html`
    <div style="display:${ display }">
    <p>Found some problems!</p>
    <ul>${ problems }</ul>
  </div>`
}
