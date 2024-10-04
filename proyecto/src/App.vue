<template>
  <v-app>
    <!-- Menú lateral -->
<v-navigation-drawer  theme="dark" permanent  expand-on-hover rail>
<v-list-item link to="/" title="Empleados" prepend-icon="mdi-account"></v-list-item>
<v-list-item link to="/ventas" title="Ventas" prepend-icon="mdi-sale"></v-list-item>
<v-list-item link to="/compras" title="Compras" prepend-icon="mdi-store"></v-list-item>
</v-navigation-drawer>
<!-- Carga de componentes -->
    <v-main>
      <AppBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';


export default {
  name: 'App',

  data: () => ({
    //
  }),
  components:{
    AppBar
  }

}
</script>
