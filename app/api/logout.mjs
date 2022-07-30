function logout () {
  return {
    session: {},
    location: '/'
  }
}

export let get = logout
export let post = logout
