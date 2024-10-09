<template>
    <v-container :fluid="true">
        <h1>Roles</h1>
        <v-btn @click="modalAgregar = true" color="primary">
            Agregar rol
        </v-btn>


        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Roles
                    </th>
                    <th class="text-left">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in $store.getters.getRoles" :key="i">
                    <td>{{ item.nombre }}</td>
                    <td>
                        <v-btn icon="mdi-pencil" size="x-small" color="indigo" class="mx-1"
                            @click="abrirModalEditar(item.id)"></v-btn>
                        <v-btn icon="mdi-close" size="x-small" color="red" class="mx-1"
                            @click="abrirModalEliminar(item.id)"></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <!--Modal para agregar-->
        <v-dialog v-model="modalAgregar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Agregar rol">
                <v-row>
                    <v-col>
                        <v-text-field label="Rol" type="text" v-model="rol" required :rules="[v => !!v || 'El rol es obligatorio']" ></v-text-field>
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
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Editar rol">
                <v-row>
                    <v-col>
                        <v-text-field label="Rol" type="text" v-model="rolEditar.nombre"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn class="me-4" @click="editar">
                            Guardar
                        </v-btn>
                        <v-btn class="ms-auto" text="Cancelar" @click="modalEditar = false"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>

        <!--Modal para eliminar-->
        <v-dialog v-model="modalEliminar" width="auto">
            <v-card max-width="400" class="pa-6" prepend-icon="mdi-update" title="Eliminar rol">
                <p>¿Esta seguro de eliminar el registro? Esta acción no se puede deshacer</p>
                <br>
                <v-row>
                    <v-col>
                        <v-btn class="me-4" @click="eliminar">
                            Eliminar
                        </v-btn>
                        <v-btn class="ms-auto" text="Camcelar" @click="modalEliminar = false"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'RolView',
    data() {
        return {
            modalAgregar: false,
            modalEditar: false,
            modalEliminar: false,
            rol: '',
            rolEliminar: null,
            rolEditar: null
        }
    },
    methods: {
        //Agregar
        agregar() {
            if (!this.rol || this.rol.trim() === '') {
                // alert('El campo no puede estar vacío.'); 
                return;
            }

            let rolNuevo = { nombre: this.rol };

            this.$store.dispatch('agregarRolAccion', rolNuevo).then(() => {
                this.rol = ''; 
                this.modalAgregar = false; 
            }).catch(error => {
                alert('Error al agregar el rol:', error); 
            });
        }, 
        //Editar
        abrirModalEditar(id) {
            const rol = this.$store.getters.getRoles.find(rol => rol.id === id);
            if (rol) {
                this.rolEditar = { ...rol }; // Clonar el objeto para evitar modificar directamente el estado
                this.modalEditar = true;
            } else {
                console.error('No se encontró el rol con el ID:', id);
            }
        },
        // Método para guardar la edición
        editar() {
            this.$store.dispatch('editarRolAccion', this.rolEditar).then(() => {
                this.modalEditar = false; // Cerrar modal después de editar
                this.rolEditar = null; // Limpiar el objeto de edición
            });
        },

        //Eliminar
        abrirModalEliminar(id) {
            this.rolEliminar = id;
            this.modalEliminar = true;
        },
        eliminar() {
            this.$store.dispatch('eliminarRolAccion', this.rolEliminar).then(() => {
                this.modalEliminar = false;
                this.rolEliminar = null;
            });
        }
    }
}
</script>