import sinon from "sinon";
import { mutations } from "../../../src/store/store";
// eslint-disable-next-line
const storeInjector = require("inject-loader!../../../src/store/store");

const getPropertiesForAreaSpy = sinon.stub();
const mockedListing = ["areaN11Results"];
getPropertiesForAreaSpy.returns(
  Promise.resolve(
    {
      search_results: 1,
      area: "N11",
      listing: mockedListing,
    },
  ),
);
const { actions } = storeInjector({
  "../services/search": {
    getPropertiesForArea: getPropertiesForAreaSpy,
  },
});

describe("mutations", function() {
  describe("updateListing", function() {
    beforeEach(function() {
      this.state = {
        listing: [],
      };
      this.newListing = ["a", "b", "c"];
      mutations.updateListing(this.state, { newListing: this.newListing });
    });

    it("should update the listing in state", function() {
      expect(this.state.listing).to.be.equal(this.newListing);
    });
  });

  describe("updateListingCount", function() {
    beforeEach(function() {
      this.state = {
        listingCount: 0,
      };
      this.newListingCount = 4;
      mutations.updateListingCount(this.state, { newListingCount: this.newListingCount });
    });

    it("should update the listing count in state", function() {
      expect(this.state.listingCount).to.be.equal(this.newListingCount);
    });
  });

  describe("updateArea", function() {
    beforeEach(function() {
      this.state = {
        area: "",
      };
      this.newArea = "C4N3";
      mutations.updateArea(this.state, { newArea: this.newArea });
    });

    it("should update the listing count in state", function() {
      expect(this.state.area).to.be.equal(this.newArea);
    });
  });

  describe("incrementSearchCounter", function() {
    beforeEach(function() {
      this.state = {
        searchCounter: 0,
      };
      mutations.incrementSearchCounter(this.state);
    });

    it("should update the search counter in state", function() {
      expect(this.state.searchCounter).to.be.equal(1);
    });
  });

  describe("resetSearchCounter", function() {
    beforeEach(function() {
      this.state = {
        searchCounter: 120,
      };
      mutations.resetSearchCounter(this.state);
    });

    it("should reset the search counter in state", function() {
      expect(this.state.searchCounter).to.be.equal(0);
    });
  });
});

describe("actions", function() {
  describe("fetchSearchResults", function() {
    beforeEach(function() {
      this.area = "N11";
      this.mockCommit = sinon.spy();
    });

    it("should call the get property service", function() {
      actions.fetchSearchResults({ commit: this.mockCommit }, { area: this.area });
      expect(getPropertiesForAreaSpy.calledWith("N11")).to.be.true;
    });

    it("should call the updateListing mutation", async function() {
      await actions.fetchSearchResults({ commit: this.mockCommit }, { area: this.area })
        // .then(() => {
          expect(this.mockCommit.calledWith("updateListing", { newListing: mockedListing })).to.be.true;
        // });
    });

    it("should call the updateListingCount mutation", function() {
      return actions.fetchSearchResults({ commit: this.mockCommit }, { area: this.area })
        .then(() => {
          expect(this.mockCommit.calledWith("updateListingCount", { newListingCount: 1 })).to.be.true;
        });
    });

    it("should call the updateArea mutation", function() {
      return actions.fetchSearchResults({ commit: this.mockCommit }, { area: this.area })
        .then(() => {
          expect(this.mockCommit.calledWith("updateArea", { newArea: this.area })).to.be.true;
        });
    });
  });
});
