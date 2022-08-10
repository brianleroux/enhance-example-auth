export default function problems ({ html, state }) {
  let name = 'form-login'
  let display = state.store.problems?.[name]?.problems?.length > 0? 'block' : 'none'
  let li = p => `<li>${ p.message }</li>`
  let problems = state.store.problems?.[name]?.problems?.map(li).join('') || ''
  return html`
    <div style="display:${ display }">
    <p>Found some problems!</p>
    <ul>${ problems }</ul>
  </div>`
}
