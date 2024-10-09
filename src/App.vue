<template>
  <v-app>

    <v-navigation-drawer expand-on-hover rail theme="dark">
      <v-list>
        <v-list-item prepend-avatar="https://cdn-icons-png.flaticon.com/512/149/149071.png" subtitle="prueba@gmailcom"
          title="Nombre usuario"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item link to="/rol" title="Roles" prepend-icon="mdi-account-cog"></v-list-item>
        <v-list-item link to="/" title="Empleados" prepend-icon="mdi-account"></v-list-item>
        <v-list-item link to="/ventas" title="Ventas" prepend-icon="mdi-sale"></v-list-item>
        <v-list-item link to="/compras" title="Compras" prepend-icon="mdi-store"></v-list-item>
        <v-list-item link to="/producto" title="Productos" prepend-icon="mdi-package"></v-list-item>
        <v-list-item link to="/categorias" title="Categorias" prepend-icon="mdi-folder-multiple"></v-list-item>
        <v-list-item link to="/proveedor" title="Proveedor" prepend-icon="mdi-truck"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <AppBar />
      <router-view />
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
  components: {
    AppBar
  }

}
</script>
