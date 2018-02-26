<template>
  <div id="search">
    <h1 v-if="listingCount === 0">{{title}}</h1>
    <h1 v-else>{{titleEmpty}}</h1>
    <form>
      <input type="text" v-model="q">
      <button
        type="submit"
        @click="submit"
      >Search</button>
    </form>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      title: "Search for houses and flats for sale across the UK",
      titleEmpty: "No results found",
      q: "",
    };
  },
  methods: {
    ...mapActions(["fetchSearchResults"]),
  },
  computed: mapState({
    listingCount: ({ listingCount }) => listingCount,
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
