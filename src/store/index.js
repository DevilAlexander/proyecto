import { createStore } from 'vuex';

export default createStore({

  state: {
    //Chamba
    employees: [
      { id: 1, username: 'jdoe', role: 'Admin' },
      { id: 2, username: 'asmith', role: 'User' }
    ],
    compras: [
      { id: 1, producto: 'Producto 1', categoria: 'Categoría 1', cantidad: 5, proveedor: 'Proveedor 1' },
      { id: 2, producto: 'Producto 2', categoria: 'Categoría 2', cantidad: 10, proveedor: 'Proveedor 2' },
      { id: 3, producto: 'Producto 3', categoria: 'Categoría 3', cantidad: 3, proveedor: 'Proveedor 3' },
    ],

    //Lue
    roles: [{ id: 1, nombre: 'Administrador' }],
    categorias: [{ id: 1, nombre: 'Medicamentos' }],
    medicamentos: [{ id: 1, nombre: "Ibuprofeno 400mg", descripcion: 'Antiinflamatorio no esteroideo, reduce inflamación.', precio: 3.50, stock: 10, categoria: 'Medicamentos' }],
    proveedores: [{ id: 1, nombre: "Farmacéuticos Unidos", telefono: '12345678', email: 'prueba@gmail.com', direccion: 'Calle Salud, 123, Madrid, España' }]

  },

  getters: {
    employees: (state) => state.employees,
    todasLasCompras(state) {
      return state.compras;
    },

    //Lue
    getMedicamentos(state) {
      return state.medicamentos;
    },
    getProveedores(state) {
      return state.proveedores;
    },
    getCategorias(state) {
      return state.categorias;
    },
    getRoles(state) {
      return state.roles;
    }
  },

  mutations: {
    //Chamba
    ADD_EMPLOYEE(state, employee) {
      employee.id = state.employees.length + 1;
      state.employees.push(employee);
    },
    EDIT_EMPLOYEE(state, employee) {
      const index = state.employees.findIndex(e => e.id === employee.id);
      if (index !== -1) {
        state.employees[index] = employee;
      }
    },
    DELETE_EMPLOYEE(state, id) {
      state.employees = state.employees.filter(e => e.id !== id);
    },
    agregarCompra(state, compra) {
      state.compras.push(compra);
    },
    editarCompra(state, { id, compra }) {
      const index = state.todasLasCompras.findIndex(c => c.id === id);
      if (index !== -1) {
        state.todasLasCompras.splice(index, 1, compra);
      }
    },
    eliminarCompra(state, id) {
      state.compras = state.compras.filter(compra => compra.id !== id);
    },

    //Lue
    //Rol
    agregarRol(state, id) {
      state.roles.push(id)
    },
    editarRol(state, rolActualizado) {
      const index = state.roles.findIndex(rol => rol.id === rolActualizado.id);
      if (index !== -1) {
        state.roles.splice(index, 1, rolActualizado); // Actualizar el array
      }
    },
    eliminarRol(state, id) {
      const index = state.roles.findIndex(rol => rol.id === id);
      if (index !== -1) {
        state.roles.splice(index, 1);
      }
    },
    //Categorias
    agregarCategoria(state, id) {
      state.categorias.push(id)
    },
    eliminarCategoria(state, id) {
      const index = state.categorias.findIndex(categoria => categoria.id === id);
      if (index !== -1) {
        state.categorias.splice(index, 1);
      }
    },
    //Proveedor
    agregarProveedor(state, id) {
      state.proveedores.push(id)
    },
    eliminarProveedor(state, id) {
      const index = state.proveedores.findIndex(proveedor => proveedor.id === id);
      if (index !== -1) {
        state.proveedores.splice(index, 1);
      }
    },
    //Producto
    agregarProducto(state, id) {
      state.medicamentos.push(id)
    },
    eliminarProducto(state, id) {
      const index = state.medicamentos.findIndex(medicamento => medicamento.id === id);
      if (index !== -1) {
        state.medicamentos.splice(index, 1);
      }
    },
  },
  actions: {
    addEmployee({ commit }, employee) {
      commit('ADD_EMPLOYEE', employee);
    },
    editEmployee({ commit }, employee) {
      commit('EDIT_EMPLOYEE', employee);
    },
    deleteEmployee({ commit }, id) {
      commit('DELETE_EMPLOYEE', id);
    },
    agregarCompra({ commit }, compra) {
      commit('agregarCompra', compra);
    },
    editarCompra({ commit }, compra) {
      commit('editarCompra', compra);
    },
    eliminarCompra({ commit }, id) {
      commit('eliminarCompra', id);
    },

    //Lue
    //Roles
    agregarRolAccion(context, id) {
      //esta instrucción permite invocar una mutacion
      context.commit('agregarRol', id)
    },
    editarRolAccion(context, rolActualizado) {
      context.commit('editarRol', rolActualizado);
    },
    eliminarRolAccion(context, id) {
      context.commit('eliminarRol', id)
    },

    //Categorias
    agregarCategoriaAccion(context, id) {
      //esta instrucción permite invocar una mutacion
      context.commit('agregarCategoria', id)
    },
    eliminarCategoriaAccion(context, id) {
      context.commit('eliminarCategoria', id)
    },

    //Proveedores
    agregarProveedorAccion(context, id) {
      //esta instrucción permite invocar una mutacion
      context.commit('agregarProveedor', id)
    },
    eliminarProveedorAccion(context, id) {
      context.commit('eliminarProveedor', id)
    },

    //Producto
    agregarProductoAccion(context, id) {
      //esta instrucción permite invocar una mutacion
      context.commit('agregarProducto', id)
    },
    eliminarProductoAccion(context, id) {
      context.commit('eliminarProducto', id)
    }

  },
  modules: {
  }

});
