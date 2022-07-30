import data from '@begin/data'
import bcrypt from 'bcryptjs'

export let validate = {
  async create ({ email, password }) {
    let problems = []
    if (!email) 
      problems.push('missing email')
    if (!password) 
      problems.push('missing password')
    let account = await data.get({ 
      table: 'accounts', 
      key: email, 
    })
    if (account) 
      problems.push('account already registered')
    return problems.length > 0? problems : false
  },

  async read ({ email, password }) {
    let problems = []
    if (!email) 
      problems.push('missing email')
    if (!password) 
      problems.push('missing password')
    return problems.length > 0? problems : false
  }
}

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
    if (!account) {
      return false
    }
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

