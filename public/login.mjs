import { enhance, api } from './enhance.mjs'

enhance('form-problems', {
  init () {
    this.div = this.querySelector('div')
    this.ul = this.querySelector('ul')
  },
  render (problems) {
    const li = msg => `<li>${ msg }</li>`
    this.div.style.display = 'block'
    this.ul.innerHTML = problems.map(li).join('')
  }
})

enhance('form-login', {

  init () {
    this.form = this.querySelector('form')
    this.problems = this.querySelector('form-problems')
    this.on(this.form, 'submit', this.login)
  },

  async login () {
    try {
      let res = await api.post('/login', this.form)

      if (res.html && res.location) {
        window.history.pushState({}, "", res.location)
        window.onpopstate = function(event) {
          window.location = '/admin'
        }

        let parser = new DOMParser()
        let doc = parser.parseFromString(res.html, 'text/html')
        window.document.body.innerHTML = doc.body.innerHTML
      }

      if (res.problems) {
        this.problems.render(res.problems)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
})
