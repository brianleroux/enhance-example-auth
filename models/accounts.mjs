import data from '@begin/data'
import bcrypt from 'bcryptjs'

/** validators return problems for forms to display */
export let validate = {

  async create (values) {
    let { email, password, confirm } = values
    let problems = []
    if (!email) 
      problems.push({ name: 'email', message: 'missing email'})
    if (!password) 
      problems.push({ name: 'password', message: 'missing password' })
    if (password && !confirm)
      problems.push({ name: 'confirm', message: 'missing password confirm' })
    if (password && confirm && password != confirm)
      problems.push({ name: 'password', message: 'password does not match confirm' })
    if (email) {
      let account = await data.get({ 
        table: 'accounts', 
        key: email, 
      })
      if (account)
        problems.push({ message: 'account already registered' })
    }
    let res = { 'form-register': { problems, values: {email} }}
    return problems.length > 0? res : false
  },

  async read (values) {
    let { email, password } = values
    let problems = []
    if (!email)
      problems.push({ name: 'email', message: 'missing email' })
    if (!password)
      problems.push({ name: 'password', message: 'missing password' })
    let account = await data.get({
      table: 'accounts',
      key: email,
    })
    if (!account)
      problems.push({ message: 'account not found' })
    let res = { 'form-login': { problems, values }}
    return problems.length > 0? res : false
  }
}

/** accounts CRUDL */
export let accounts = {

  /** create a new account (register) */
  async create ({ email, password }) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    await data.set({ 
      table: 'accounts', 
      key: email, 
      password: hash
    })
    return email
  },

  /** read account (login / verify password) */
  async read ({ email, password }) {
    let account = await data.get({
      table: 'accounts', 
      key: email, 
    })
    let allow = bcrypt.compareSync(password, account.password)
    return allow? email : false
  },

  /** removes an account */
  async destroy (email) {
    await data.destroy({
      table: 'accounts',
      key: email,
    })
  }
}
