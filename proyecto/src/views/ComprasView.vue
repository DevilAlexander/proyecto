<!-- src/views/ComprasView.vue -->
<template>
    <v-container>
      <v-btn color="primary" @click="abrirModalAgregar">Comprar Agregar</v-btn>
  
      <v-text-field v-model="search" label="Buscar" solo></v-text-field>
  
      <v-data-table :headers="headers" :items="filtrarCompras" class="elevation-1">
        <template top>
          <v-toolbar>
            <v-toolbar-title>Compras</v-toolbar-title>
          </v-toolbar>
        </template>
  
        <template item.acciones="{ item }">
          <v-btn icon @click="abrirModalEditar(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="eliminarCompra(item.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
  
      <v-dialog v-model="modalAgregar" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Compra</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="nuevaCompra.producto" label="Producto"></v-text-field>
            <v-text-field v-model="nuevaCompra.categoria" label="Categoría"></v-text-field>
            <v-text-field v-model="nuevaCompra.cantidad" label="Cantidad" type="number"></v-text-field>
            <v-text-field v-model="nuevaCompra.proveedor" label="Proveedor"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="agregarCompra">Agregar</v-btn>
            <v-btn color="red darken-1" text @click="cerrarModalAgregar">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="modalEditar" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Compra</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="compraEditar.producto" label="Producto"></v-text-field>
            <v-text-field v-model="compraEditar.categoria" label="Categoría"></v-text-field>
            <v-text-field v-model="compraEditar.cantidad" label="Cantidad" type="number"></v-text-field>
            <v-text-field v-model="compraEditar.proveedor" label="Proveedor"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editarCompra">Actualizar</v-btn>
            <v-btn color="red darken-1" text @click="cerrarModalEditar">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        search: '',
        modalAgregar: false,
        modalEditar: false,
        nuevaCompra: {
          producto: '',
          categoria: '',
          cantidad: 0,
          proveedor: '',
        },
        compraEditar: {},
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Producto', value: 'producto' },
          { text: 'Categoría', value: 'categoria' },
          { text: 'Cantidad', value: 'cantidad' },
          { text: 'Proveedor', value: 'proveedor' },
          { text: 'Acciones', value: 'acciones', sortable: false },
        ],
      };
    },
    computed: {
  ...mapGetters(['todasLasCompras']),
  filtrarCompras() {
    console.log('Compras:', this.todasLasCompras); // Verifica que las compras se estén recibiendo
    return this.todasLasCompras.filter(compra => 
      compra.producto.toLowerCase().includes(this.search.toLowerCase()) ||
      compra.categoria.toLowerCase().includes(this.search.toLowerCase())
    );
  },
},
    methods: {
      abrirModalAgregar() {
        this.nuevaCompra = { producto: '', categoria: '', cantidad: 0, proveedor: '' };
        this.modalAgregar = true;
      },
      cerrarModalAgregar() {
        this.modalAgregar = false;
      },
      agregarCompra() {
        const id = this.todasLasCompras.length ? this.todasLasCompras[this.todasLasCompras.length - 1].id + 1 : 1;
        this.$store.commit('agregarCompra', { id, ...this.nuevaCompra });
        this.cerrarModalAgregar();
      },
      abrirModalEditar(compra) {
        this.compraEditar = { ...compra };
        this.modalEditar = true;
      },
      cerrarModalEditar() {
        this.modalEditar = false;
      },
      editarCompra() {
        this.$store.commit('editarCompra', { id: this.compraEditar.id, compra: this.compraEditar });
        this.cerrarModalEditar();
      },
      eliminarCompra(id) {
        this.$store.commit('eliminarCompra', id);
      },
    },
  };
  </script>
  