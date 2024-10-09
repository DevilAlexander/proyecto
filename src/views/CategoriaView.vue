<template>
    <v-container :fluid="true">
        <h1>Categorias</h1>

        <v-btn @click="modalAgregar = true" color="primary">
            Agregar categoria
        </v-btn>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Categoría
                    </th>
                    <th class="text-left">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in $store.getters.getCategorias" :key="i">
                    <td>{{ item.nombre }}</td>
                    <td>
                        <v-btn icon="mdi-pencil" size="x-small" color="indigo" class="mx-1"
                            @click="modalEditar = true"></v-btn>
                        <v-btn icon="mdi-close" size="x-small" color="red" class="mx-1"
                            @click="abrirModalEliminar(item.id)"></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <!--Modal para agregar-->
        <v-dialog v-model="modalAgregar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Agregar categoria">
                <v-row>
                    <v-col>
                        <v-text-field label="Categoria" type="text" v-model="categoria" required :rules="[v => !!v || 'La categoría es obligatorio']"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn class="me-4" @click="agregar">
                            Guardar
                        </v-btn>
                        <v-btn class="ms-auto" text="Cancelar" @click="modalAgregar = false"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>

        <!--Modal para editar-->
        <v-dialog v-model="modalEditar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Editar categoria">
                <v-row>
                    <v-col>
                        <v-text-field label="Categoria" type="text"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn class="me-4">
                        Guardar
                    </v-btn>
                    <v-btn class="ms-auto" text="Cancelar" @click="modalEditar = false"></v-btn>
                </v-row>
            </v-card>
        </v-dialog>

        <!--Modal para eliminar-->
        <v-dialog v-model="modalEliminar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Eliminar categoria">
                <p>¿Esta seguro de eliminar el registro? Esta acción no se puede deshacer</p>
                <br>
                <v-row>
                    <v-col>
                        <v-btn class="me-4" @click="eliminar">
                            Eliminar
                        </v-btn>
                        <v-btn class="ms-auto" text="Cancelar" @click="modalEliminar = false"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'ProductoView',
    data() {
        return {
            modalAgregar: false,
            modalEditar: false,
            modalEliminar: false,
            categoria: '',
            categoriaEliminar: null
        }
    },
    methods: {
        agregar() {
            if (!this.categoria || this.categoria.trim() === '') {
                return;
            }

            let categoriaNueva = { nombre: this.categoria };

            this.$store.dispatch('agregarCategoriaAccion', categoriaNueva).then(() => {
                this.categoria = '';
                this.modalAgregar = false;
            }).catch(error => {
                alert('Error al agregar la categoría:', error);
            });
        },

        abrirModalEliminar(id) {
            this.categoriaEliminar = id;
            this.modalEliminar = true;
        },
        eliminar() {
            this.$store.dispatch('eliminarCategoriaAccion', this.categoriaEliminar).then(() => {
                this.modalEliminar = false;
                this.categoriaEliminar = null;
            });
        }

    }
}
</script>