<template>
  <div id="bg-image"></div>
  <div id="nav" :class="{ 'navbar--hidden': !showNavbar }">
    <router-link class="nav-item" to="/">Home ホーム</router-link>
    <router-link class="nav-item" to="/messages">Messages ココへの贈り物</router-link>
  </div>
  <vue-progress-bar></vue-progress-bar>
  <div id="bg-container"></div>
  <div id="app-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  created () {
    // When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },
  mounted () {
    this.onScrollDebounced = debounce(this.onScroll, 100)
    window.addEventListener('scroll', this.onScrollDebounced)
    // When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScrollDebounced)
  }
}
</script>

<style src="aos/dist/aos.css"></style>
<style src="magnific-popup/dist/magnific-popup.css"></style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Kosugi+Maru&family=Patrick+Hand&family=Noto+Sans+JP&family=Roboto&display=swap');

#nav {
  overflow: auto;
  background-color: #333;
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 99;
  font-family: 'Roboto';
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
  position: fixed;
  white-space: nowrap;
}

#nav a {
  display: inline-block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

#nav a:hover, #nav a.router-link-active {
  background: orange;
  color: black;
  font-weight: bolder;
}

#nav.navbar--hidden {
  transform: translate3d(0, -100%, 0);
}

#app-content {
  padding-top: 10px;
  margin-top: 46.4px;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

#bg-image {
  position: fixed;
  background-image: url('~@/assets/images/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -99;
  /* filter: brightness(70%); */
}

</style>
