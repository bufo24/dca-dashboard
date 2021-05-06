<template>
  <router-link to="/dashboard">Dashboard</router-link><span>-</span>
  <router-link to="/sats">Check your sats</router-link><br /><br />
  <router-view></router-view>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
