<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/messages">Messages</router-link>
  </div>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Kosugi+Maru&family=Patrick+Hand&display=swap');

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

body {
  background-color: orange;
}
</style>
