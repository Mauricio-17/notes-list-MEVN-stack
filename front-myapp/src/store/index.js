import Vue from 'vue'
import Vuex from 'vuex'
// para decodificar el jwt
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    userDB: ''
  },
  mutations: {
    getUser(state, payload) {
      state.token = payload
      if(payload){
        state.userDB = decode(payload)
      }else{
        state.userDB = ''
      }
    },
  },
  actions: {
    saveUser({commit}, user){
      localStorage.setItem('token', user)
      commit('getUser', user)
      //router.push({name: 'Notes'})
    },
    logOut({commit}){
      localStorage.removeItem('token')
      commit('getUser', '')
      router.push({name: 'Login'})
    },
    readToken({commit}) {
      let token = localStorage.getItem('token')
      if(token){
        commit('getUser', token)
      }else{
        commit('getUser', '')
      }
    }
  },
  getters:{
    isLogged: state => !!state.token
  },
  modules: {
  }
})
