import { initAuth, signOut, signIn, createUser, emailReset, emailVerification } from '~/services/fireinit'

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    email: null,
    emailVerified: false,
  },
  afterLogin: '/users', // donde dirigirse una vez complete el login (si accedió y no tenía permiso)
  listeningAuth: false,
})

export const getters = {
  logged: (state, getters, rootState) => state.user.uid !== null,
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user.displayName = user.displayName
      state.user.uid = user.uid
      emailVerified: user.emailVerified
    } else {
      // clearUserState
      state.user.displayName = ''
      state.user.uid = null
      state.user.emailVerified = false
    }
  },
  setListeningAuth(state, listening) {
    state.listeningAuth = listening
  },
  setAfterLogin(state, url) {
    state.afterLogin = url
  },
}

export const actions = {
  initAuth({ state, commit, dispatch }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      initAuth((user) => {
        commit('setUser', user)
      })
    }
  },
  async logout({ commit, dispatch }) {
    await signOut()
  },
  async signUserUp({ state, commit, dispatch }, { email, password }) {
    await createUser(email, password)
    return state.user
  },
  async signUserIn({ commit, state, dispatch }, { email, password }) {
    await signIn(email, password)
    return state.user
  },
  async resetPasswordWithEmail({ commit }, email) {
    await emailReset(email)
  },
  async sendVerificationEmail({ state, dispatch }) {
    return await emailVerification()
  },
}
