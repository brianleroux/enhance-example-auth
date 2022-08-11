import { enhance, api } from './enhance.mjs'

enhance('form-register', {
  init () {
    this.form = this.querySelector('form')
    this.on(this.form, 'submit', this.register)
  },
  async register () {
    try {
      await api.post(this.form)
    }
    catch (e) {
      console.log('form-register error', e)
    }
  }
})
