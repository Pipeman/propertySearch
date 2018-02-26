import Vue from "vue";
import sinon from "sinon";
// eslint-disable-next-line
const Search = require("!!vue-loader?inject!../../../src/components/Search.vue");

const fetchSearchResultsSpy = sinon.stub();
fetchSearchResultsSpy.withArgs("N11")
  .returns(
    Promise.resolve(
      {
        search_results: 1,
        area: "N11",
        listing: [{}],
      },
    ),
  );
fetchSearchResultsSpy.returns(
  Promise.resolve(
    {
      search_results: 0,
      area: "",
      listing: [],
    },
  ),
);
const SearchWithMocks = Search({
  "../store/store": {
    fetchSearchResults: fetchSearchResultsSpy,
  },
});

beforeEach(function() {
  const Constructor = Vue.extend(SearchWithMocks);
  this.vm = new Constructor().$mount();
});

describe.only("Search.vue", () => {
  it("should render correct contents", function() {
    expect(this.vm.$el.querySelector("h1").textContent)
      .to.equal("Search for houses and flats for sale across the UK");
    expect(this.vm.$el.querySelector("input")).to.exist;
    expect(this.vm.$el.querySelector("button").textContent).to.equal("Search");
  });

  describe("when the search button is pressed", () => {
    beforeEach(function() {
      this.vm.$el.querySelector("input").value = "N11";
      this.vm.$el.querySelector("input").dispatchEvent(new Event("input"));
      this.vm.$el.querySelector("button").click();
    });

    it("should call search service", () => {
      expect(fetchSearchResultsSpy.called).to.be.true;
      expect(fetchSearchResultsSpy.calledWith("N11")).to.be.true;
    });
  });

  describe("when the search return 0 results", () => {
    beforeEach(function() {
      this.vm.$el.querySelector("input").value = "SE1";
      this.vm.$el.querySelector("input").dispatchEvent(new Event("input"));
      this.vm.$el.querySelector("button").click();
    });

    it("should display search input and button", function() {
      expect(this.vm.$el.querySelector("input")).to.exist;
      expect(this.vm.$el.querySelector("button").textContent).to.equal("Search");
    });

    it("should display a no reults message", function(done) {
      done();
      expect(this.vm.$el.querySelector("h1").textContent)
        .to.equal("No results found");
    });
  });
});
