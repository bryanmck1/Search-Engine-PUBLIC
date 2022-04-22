<template>
  <div class="routerLinks">
    <router-link to="/search" class="link">All</router-link>
    <router-link to="/images" class="link">Images</router-link>
    <router-link to="/news" class="link">News</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.routerLinks {
  display: flex;
  width: 80%;
  margin: calc(13rem + 0.5vw) auto 2.5rem auto;
}

.link {
  background-color: #f5f5f5;
  padding: 8px 20px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(6rem + 0.25vw);
  height: calc(2rem + 0.25vw);
  color: black;
  margin: 0.5rem;
  font-size: calc(1.2rem + 0.25vw);
}

.link:hover {
  background-color: #555;
  color: white;
}

.routerLinks .router-link-active {
  background-color: black;
  color: white;
}
</style>
