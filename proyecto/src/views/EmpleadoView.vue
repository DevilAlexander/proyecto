<template>
  <h1>Empleados</h1>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Buscar empleado"
          prepend-icon="mdi-magnify"
          solo
        />
      </v-col>
      <v-col>
        <v-btn color="primary" @click="openAddModal">
          Agregar Empleado
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredEmployees"
      item-value="id"
      class="elevation-1"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-btn icon @click="openEditModal(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="confirmDeleteEmployee(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  
    <!-- Modal para agregar empleado -->
    <v-dialog v-model="addDialog" max-width="500px">
      <v-card>
        <v-card-title>Agregar Empleado</v-card-title>
        <v-card-text>
          <v-text-field v-model="newEmployee.username" label="Usuario"></v-text-field>
          <v-text-field v-model="newEmployee.role" label="Rol"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="handleAddEmployee">Guardar</v-btn> <!-- Cambiado -->
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para editar empleado -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Editar Empleado</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedEmployee.username" label="Usuario"></v-text-field>
          <v-text-field v-model="editedEmployee.role" label="Rol"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveEditEmployee">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      search: '',
      addDialog: false,
      editDialog: false,
      newEmployee: { username: '', role: '' },
      editedEmployee: { id: null, username: '', role: '' },
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Usuario', value: 'username' },
        { text: 'Rol', value: 'role' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ]
    };
  },
  computed: {
    ...mapState(['employees']),
    filteredEmployees() {
      return this.employees.filter((employee) => {
        return (
          employee.username.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.role.toLowerCase().includes(this.search.toLowerCase()) ||
          employee.id.toString().includes(this.search)
        );
      });
    }
  },
  methods: {
    ...mapActions(['addEmployee', 'editEmployee', 'deleteEmployee']),
    openAddModal() {
      this.addDialog = true;
      this.newEmployee = { username: '', role: '' };
    },
    openEditModal(employee) {
      this.editDialog = true;
      this.editedEmployee = { ...employee };
    },
    handleAddEmployee() { // Renombrado para evitar confusión con la acción de Vuex
      this.addEmployee(this.newEmployee); // Acción de Vuex
      this.addDialog = false;
    },
    saveEditEmployee() {
      this.editEmployee(this.editedEmployee);
      this.editDialog = false;
    },
    confirmDeleteEmployee(id) {
      this.deleteEmployee(id); // Acción de Vuex
    }
  }
};
</script>
