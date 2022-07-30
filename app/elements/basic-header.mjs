export default function header ({ html, state }) {
  if (state.store.email) {
    return html`
<header>
  <nav>
    <a href=/>home</a>
    <a href=/admin>admin</a>
    <a href=/logout>logout ${ state.store.email }</a>
  </nav>
</header>`
  }
  else {
    return html`
<header>
  <nav>
    <a href=/>home</a>
    <a href=/login>login</a>
    <a href=/register>register</a>
  </nav>
</header>`
  }
}
