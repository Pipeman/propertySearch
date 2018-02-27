import Vue from "vue";
import Vuex, { Store } from "vuex";
import getPropertiesForArea from "../services/search";

Vue.use(Vuex);

export const mutations = {
  updateListing(state, { newListing }) {
    state.listing = newListing;
  },
  updateListingCount(state, { newListingCount }) {
    state.listingCount = newListingCount;
  },
  updateArea(state, { newArea }) {
    state.area = newArea;
  },
  incrementSearchCounter(state) {
    state.searchCounter += 1;
  },
  resetSearchCounter(state) {
    state.searchCounter = 0;
  },
};

export const actions = {
  fetchSearchResults({ commit }, { area }) {    
    return getPropertiesForArea(area)
      .then(response => response.json())
      .then(({ listing, search_results: listingCount, area }) => {        
        commit("updateListing", { newListing: listing });
        commit("updateListingCount", { newListingCount: listingCount });
        commit("updateArea", { newArea: area });
        if (!listingCount) {
          commit("incrementSearchCounter");
        } else {
          commit("resetSearchCounter");
        }
      });
  },
};

export default new Store({
  state: {
    listingCount: 0,
    area: "",
    listing: [],
    searchCounter: 0,
  },
  mutations,
  actions,
});
