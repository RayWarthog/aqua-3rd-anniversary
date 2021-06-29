<template>
  <div id="bg-image"></div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/messages">Messages</router-link>
  </div>
  <div id="bg-container"></div>
  <div id="app-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Kosugi+Maru&family=Patrick+Hand&family=Roboto&display=swap');

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
