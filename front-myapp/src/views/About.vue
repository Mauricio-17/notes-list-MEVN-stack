<template>
  <v-container>
    <h2>ABOUT page</h2>
    <router-link :to="{query: {section: 1}}">
      1
    </router-link> |
    <router-link :to="{query: {section: 2}}">
      2
    </router-link>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  watch:{
    "$route.query.section":{
      immediate: true,
      handler(section) {
        console.log(`Sección ha cambiado: ${section}`)
      }
    }
  }
}
</script>
