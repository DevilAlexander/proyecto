import { createStore } from 'vuex';


export default createStore({
  state: {
    employees: [
      { id: 1, username: 'jdoe', role: 'Admin' },
      { id: 2, username: 'asmith', role: 'User' }
    ],
    compras: [
      { id: 1, producto: 'Producto 1', categoria: 'Categoría 1', cantidad: 5, proveedor: 'Proveedor 1' },
      { id: 2, producto: 'Producto 2', categoria: 'Categoría 2', cantidad: 10, proveedor: 'Proveedor 2' },
      { id: 3, producto: 'Producto 3', categoria: 'Categoría 3', cantidad: 3, proveedor: 'Proveedor 3' },
    ],
   
  },
  mutations: {
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
  },
  getters: {
    employees: (state) => state.employees,
    todasLasCompras(state) {
      return state.compras;
    },
  }
});
