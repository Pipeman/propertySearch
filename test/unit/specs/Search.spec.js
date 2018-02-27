import Vue from "vue";
import Vuex from "vuex";
import { mount } from "avoriaz";
import sinon from "sinon";
import Search from "../../../src/components/Search";
// eslint-disable-next-line
// const Search = require("!!vue-loader?inject!../../../src/components/Search.vue");

Vue.use(Vuex);

beforeEach(function() {
  this.actions = {
    fetchSearchResults: sinon.spy(),
  };
  this.store = new Vuex.Store({
    state: {
      searchCounter: 0,
    },
    actions: this.actions,
  });
  this.wrapper = mount(Search, { store: this.store });
  this.title = this.wrapper.find("h1")[0];
  this.input = this.wrapper.find("input")[0];
  this.button = this.wrapper.find("button")[0];
});

describe("Search.vue", () => {
  it("should render correct contents", function() {
    expect(this.title.text())
      .to.equal("Search for houses and flats for sale across the UK");
    expect(this.input).to.exist;
    expect(this.button.text()).to.equal("Search");
  });

  describe("when the search button is pressed", () => {
    beforeEach(function() {
      this.input.element.value = "N11";
      this.input.trigger("input");
      this.button.trigger("click");
    });

    it("should call search service", function() {
      expect(this.actions.fetchSearchResults.called).to.be.true;
    });
  });

  describe("when the search return 0 results", () => {
    beforeEach(function() {
      this.store = new Vuex.Store({
        state: {
          searchCounter: 1,
        },
        actions: this.actions,
      });
      this.wrapper = mount(Search, { store: this.store });
      this.title = this.wrapper.find("h1")[0];
      this.input = this.wrapper.find("input")[0];
      this.button = this.wrapper.find("button")[0];
    });

    it("should display search input and button", function() {
      expect(this.input).to.exist;
      expect(this.button.text()).to.equal("Search");
    });

    it("should display a no reults message", function() {
      expect(this.title.text()).to.equal("No results found");
    });
  });
});
