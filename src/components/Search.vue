<template>
  <div id="search">
    <h1>{{title}}</h1>
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
export default {
  name: 'Search',
  data() {
    return {
      title: 'Search for houses and flats for sale across the UK',
      q: '',
    };
  },
  methods: {
    submit() {
      fetch("https://property-search-jlrslqbnta.now.sh/search", { q: this.q })
        .then(response => {
          if (!response.ok) {
            console.error('wrongsearch');
            
          }
          return response;
        })
        .then(response => {
          console.error(response.text());
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
