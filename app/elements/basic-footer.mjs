export default function Footer ({ html, state }) {
  return html`
<footer style="background:lightgrey;margin-top:20px;border-top:1px solid black;">
  <pre>${ JSON.stringify(state, null, 2) }</pre>
</footer>`
}
