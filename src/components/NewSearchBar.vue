<template>
  <div class="wrap">
    <div class="search">
      <div class="searchBarIcon">
        <input
          type="text"
          class="searchTerm"
          placeholder="Search the web..."
          name="query"
          id="query"
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-binoculars"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.search {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.searchBarIcon {
  width: 100%;
  display: flex;
  justify-content: center;
}

.searchTerm {
  width: 100%;
  max-width: 50rem;
  border: 3px solid #594d5b;
  border-right: none;
  padding: 5px;
  height: 4.5rem;
  outline: none;
  background-color: #f5f5f5;
  font-size: calc(1.5rem + 0.25vw);
  border-radius: 20px 0 0 20px;
}

.searchTerm:focus {
  color: #594d5b;
}

.searchButton {
  width: 50px;
  border: 1px solid #594d5b;
  background: #594d5b;
  text-align: center;
  color: #eeeeee;
  cursor: pointer;
  font-size: 20px;
  border-radius: 0 20px 20px 0;
}

.wrap {
  width: 60%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
