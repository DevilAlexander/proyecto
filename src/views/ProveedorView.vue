<template>
    <v-container :fluid="true">
        <h1>Proveedor</h1>
        <v-btn @click="modalAgregar = true" color="primary">
            Agregar Proveedor
        </v-btn>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Nombre
                    </th>
                    <th class="text-left">
                        Teléfono
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Dirección
                    </th>
                    <th class="text-left">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in $store.getters.getProveedores" :key="i">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.telefono }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.direccion }}</td>
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
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Agregar proveedor">
                <v-row>
                    <v-col>
                        <v-text-field label="Nombre" type="text" v-model="nombre" required :rules="[v => !!v || 'El nombre es obligatorio']"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Correo" type="email" v-model="email" required :rules="[v => !!v || 'El email es obligatorio']"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field label="Telefono" type="number" v-model="telefono" required :rules="[v => !!v || 'El telefono es obligatorio']"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Direccion" type="text" v-model="direccion" required :rules="[v => !!v || 'La direccion es obligatoria']"></v-text-field>
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
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Editar proveedor">
                <v-row>
                    <v-col>
                        <v-text-field label="Nombre" type="text"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Correo" type="email"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field label="Telefono" type="number"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Direccion" type="text"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn class="me-4" type="submit">
                            Guardar
                        </v-btn>
                        <v-btn class="ms-auto" text="Cancelar" @click="modalEditar = false"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>


        <!--Modal para eliminar-->
        <v-dialog v-model="modalEliminar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Eliminar proveedor">
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
    name: 'ProveedorView',
    data() {
        return {
            modalAgregar: false,
            modalEditar: false,
            modalEliminar: false,
            nombre: '',
            telefono: '',
            email: '',
            direccion: '',
            proveedorEliminar: null,
        }
    },
    methods: {
        agregar() {
            if ([this.nombre, this.telefono, this.email, this.direccion].some(field => !field || field.trim() === '')) {
                return;
            }

            let proveedorNuevo = {
                nombre: this.nombre,
                telefono: this.telefono,
                email: this.email,
                direccion: this.direccion
            };

            this.$store.dispatch('agregarProveedorAccion', proveedorNuevo).then(() => {
                this.nombre = '';
                this.email = '';
                this.telefono = '';
                this.direccion = '';
                this.modalAgregar = false;
            }).catch(error => {
                console.error('Error al agregar el proveedor:', error);
            });
        },

        abrirModalEliminar(id) {
            this.proveedorEliminar = id;
            this.modalEliminar = true;
        },
        eliminar() {
            this.$store.dispatch('eliminarProveedorAccion', this.proveedorEliminar).then(() => {
                this.modalEliminar = false;
                this.proveedorEliminar = null;
            });
        }

    }
}
</script>