<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/keyslogo.svg" width="125" height="125" />

    <div class="wrapper">
      <NavigationMenu msg="Manage your EOS keys" />

      <nav>
        <RouterLink to="/">1. Generate and manage your keys</RouterLink>
        <RouterLink to="/signmessage">2. Sign a message with a Public key</RouterLink>
        <RouterLink to="/recoverpublickey">3. Recover a public key</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>





<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin: 2rem 0;
}

nav a.router-link-exact-active {
  /* color: var(--color-text); */
  color: rgb(60, 89, 216);
  background-color: rgb(168, 211, 228);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  margin: 0.2rem 0;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1.2rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
