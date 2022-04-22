<template>
  <router-link id="navBarV" class="navBarLink" to="/">V</router-link>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arvo:ital@1&display=swap");

.navBarLink {
  color: white;
  text-decoration: none;
  font-family: "Satisfy", cursive;
  font-size: calc(5rem + 0.25vw);
  position: absolute;
  top: calc(3rem + 0.25vw);
  left: calc(3rem + 0.25vw);
}

.navBarLink:hover {
  color: #594d5d;
}
</style>
