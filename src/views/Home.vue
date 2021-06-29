<template>
  <div id="home">
      <section id="start-sect">

      </section>
  </div>
</template>

<script>
export default {
  mounted () {
    // Hide navbar initially
    if (this.$root.$data.lastScrollPosition === 0) {
      this.$root.$data.showNavbar = false
    }
  }
}
</script>

<style scoped>

#start-sect {
  height: 200vh;
}
</style>
