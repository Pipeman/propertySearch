import Vue from "vue";
import Vuex, { Store } from "vuex";
import { getPropertiesForArea } from "../services/search";

Vue.use(Vuex);

export const mutations = {
  updateListing(state, newListing) {
    state.listing = newListing;
  },
  updateListingCount(state, newListingCount) {
    state.listingCount = newListingCount;
  },
  updateArea(state, newArea) {
    state.area = newArea;
  },
};

export const actions = {
  fetchSearchResults({ commit }, { area }) {
    return getPropertiesForArea(area).then((response) => {
      commit("updateListing", { newListing: response.listing });
      commit("updateListingCount", { newListingCount: response.search_results });
      commit("updateArea", { newArea: response.area });

      return response;
    });
  },
};

export default new Store({
  state: {
    listingCount: 0,
    area: "",
    listing: [],
  },
  mutations,
  actions,
});
