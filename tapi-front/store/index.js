/*
import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import state from "./state";
import getters from "./getters";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });

export default store;
*/

import axios from 'axios'

export const state = () => ({
  // user relation
  user: null,         // user name
  user_token: null,   // user token
  status: false,      // user status flag

  // search form relation
  lists: [],          // response API data
  isLoading: false    // loading flag
})

export const mutations = {
  login(state, payload) {
    state.user = payload.user_name;
    state.user_token = payload.user_token;
    state.user_id = payload.user_id;
    state.status = true;
  },
  logout(state) {
    state.user = null;
    state.user_token = null,
    state.status = false;
  },
  setItems(state, lists) {
    state.lists = lists;
  },
  hideLoading(state) {
    state.isLoading = false;
  },
  showLoading(state) {
    state.isLoading = true;
  }
}

export const getters = {
  isSignedIn(state) {
    return state.status
  }
}

export const actions = {
  async getItems({ commit }, payload) {

    const FECTH_SHOP_LIST_URL = process.env.API_URL + 'api/shops/show';
    const TAPI_API_KEY = process.env.TAPI_API_KEY;
    const DEFAULT_ITEM_DATA = 10;
      
    commit("showLoading");
    
    //const response = 
    await axios.get(
      FECTH_SHOP_LIST_URL + '?number=' + DEFAULT_ITEM_DATA,
      {
        headers: { 
          'Content-Type': 'application/json',
          'API_KEY': TAPI_API_KEY
        },
        timeout: 15000
      }
    )
    .then(res => {
      console.log(res.data);
      commit('setItems', res.data);
      commit('hideLoading');
    })
    .catch(error => {
      console.error(error);
      this.$store.commit("hideLoading");
      location.replace('/error');
    });
  }
}