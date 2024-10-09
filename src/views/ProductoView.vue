<template>
    <v-container :fluid="true">
        <h1>Producto</h1>
        <div class="text pa-4">
            <v-btn @click="modalAgregar = true" color="primary">
                Agregar producto
            </v-btn>

            <!--Modal para agregar-->
            <v-dialog v-model="modalAgregar" width="auto">
                <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Agregar producto">
                    <v-row>
                        <v-col>
                            <v-text-field label="Producto" type="text" v-model="nombre"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Descripcion" type="text" v-model="descripcion"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Precio" type="number" v-model="precio"></v-text-field>
                        </v-col>
                        <v-col>
                            <select name="" id="" v-model="categoria">
                                <option value="" disabled selected>Selecciona una categoria</option>
                                <option v-for="categoria in $store.getters.getCategorias" :key="categoria"
                                    :value="categoria.id">{{ categoria.nombre }}</option>
                            </select>
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
        </div>

        <!--Modal para editar-->
        <v-dialog v-model="modalEditar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Editar producto">
                <form @submit.prevent="submit">
                    <v-row>
                        <v-col>
                            <v-text-field label="Producto" type="text"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Descripcion" type="text"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Precio" type="number"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Stock" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-select label="Categorias"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>


                    <v-btn class="me-4" type="submit">
                        Guardar
                    </v-btn>
                    <v-btn class="ms-auto" text="Cancelar" @click="modalEditar = false"></v-btn>
                </form>
            </v-card>
        </v-dialog>


        <!--Modal para eliminar-->
        <v-dialog v-model="modalEliminar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Eliminar producto">
                <form @submit.prevent="submit">
                    <p>¿Esta seguro de eliminar el registro? Esta acción no se puede deshacer</p>
                    <br>
                    <v-btn class="me-4" @click="eliminar">
                        Eliminar
                    </v-btn>
                    <v-btn class="ms-auto" text="Cancelar" @click="modalEliminar = false"></v-btn>
                </form>
            </v-card>
        </v-dialog>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Producto
                    </th>
                    <th class="text-left">
                        Descripcion
                    </th>
                    <th class="text-left">
                        Precio
                    </th>
                    <th class="text-left">
                        Stock
                    </th>
                    <th class="text-left">
                        Categoría
                    </th>
                    <th class="text-left">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in $store.getters.getMedicamentos" :key="i">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.precio }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ item.categoria }}</td>
                    <td>
                        <v-btn icon="mdi-pencil" size="x-small" color="indigo" class="mx-1"
                            @click="modalEditar = true"></v-btn>
                        <v-btn icon="mdi-close" size="x-small" color="red" class="mx-1"
                        @click="abrirModalEliminar(item.id)"></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>

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
            nombre: '',
            descripcion: '',
            precio: '',
            categoria: null,

        }
    },
    methods: {
        agregar() {
            if ([this.nombre, this.descripcion, this.precio, this.categoria].some(field => {
                if (typeof field === 'string') {
                    return field.trim() === '';
                }
                return !field; // Devuelve true si field es falsy (null, undefined, etc.)
            })) {
                return;
            }

            let productoNuevo = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                categoria: this.categoria
            };

            this.$store.dispatch('agregarProductoAccion', productoNuevo).then(() => {
                this.nombre = '';
                this.descripcion = '';
                this.precio = '';
                this.categoria = '';
                this.modalAgregar = false;
            }).catch(error => {
                console.error('Error al agregar el producto:', error);
            });
        },

        abrirModalEliminar(id) {
            this.productoEliminar = id;
            this.modalEliminar = true;
        },
        eliminar() {
            this.$store.dispatch('eliminarProductoAccion', this.productoEliminar).then(() => {
                this.modalEliminar = false;
                this.productoEliminar = null;
            });
        }
    }
}
</script>
<style scoped>
select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>