export let api = {
  async post (form) {
    const url = form.action
    const data = new URLSearchParams()
    for (const pair of new FormData(form)) {
      data.append(pair[0], pair[1])
    }
    let raw = await fetch(url, {
      method: 'post',
      headers: { 'accept': 'application/json' },
      body: data
    })
    let res = await raw.json()
    if (res.html && res.location) {
      window.history.pushState({}, "", res.location)
      window.addEventListener('popstate', () => {
        history.go(-3) // originpage -> form page -> rendered res page
      })

      let parser = new DOMParser()
      let doc = parser.parseFromString(res.html, 'text/html')
      window.document.body.innerHTML = doc.body.innerHTML
    }
  }
}

export function enhance (tagname, options) {
  let C = class extends HTMLElement {
    constructor() {
      super()

      // setup terse event handing
      let self = this
      this.on = function on (element, eventname, handler) {
        element.addEventListener(eventname, function (e) {
          e.preventDefault()
          handler.call(self, e)
        })
      }

      // pull out init from userland defined methods
      let {init, ...copy} = options 

      // register userland methods
      for (let method of Object.keys(copy)) {
        this[method] = copy[method]
      }

      // finally call userland init
      init.call(this)
    }
  }

  // reg the className
  let parts = tagname.split('-')
  let className = ''
  for (let part of parts) {
    className += part[0].toUpperCase() + part.substring(1)
  }
  Object.defineProperty(C, 'name', { value: className })

  // add the element
  window.addEventListener('DOMContentLoaded',function () {
    customElements.define(tagname, C)
  })
}

