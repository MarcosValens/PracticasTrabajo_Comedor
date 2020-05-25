<template>
  <q-page class="q-pa-md">
    <q-table
      title="Pasar llista"
      :data="data"
      :columns="columns"
      @row-click="rowclick"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      row-key="codi"
      :selected.sync="selected"
    >
      <template slot="top">
        <div class="row justify-between align-center" style="width: 100%;">
          <div class="col">
            <q-input v-model="search.nom" label="Nom" />
          </div>
          <div class="col">
            <q-input v-model="search.cognoms.primer" label="Primer Cognom" />
          </div>
          <div class="col">
            <q-input v-model="search.cognoms.segon" label="Segon Cognom" />
          </div>
          <div class="col">
            <q-btn
              @click="$router.push('alumne')"
              icon="add_circle"
              size="14px"
              color="primary"
              label="Afegir"
            />
          </div>
        </div>
      </template>
    </q-table>
  </q-page>
</template>


<script>
export default {
  name: "PagesUsuaris",
  data() {
    return {
      selected: [],
      search: {
        nom: null,
        cognoms: {
          primer: null,
          segon: null
        }
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "Id",
          align: "left",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "nom",
          required: true,
          label: "Nom",
          align: "left",
          field: row => row.nom,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "ap1",
          required: true,
          label: "Primer cognom",
          align: "left",
          field: row => row.ap1,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "ap2",
          required: true,
          label: "Segon cognom",
          align: "left",
          field: row => row.ap2,
          format: val => `${val}`,
          sortable: true
        },
         {
          name: "usuario",
          required: true,
          label: "Usuario",
          align: "left",
          field: row => row.usuario,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "rol",
          required: true,
          label: "Tipo",
          align: "left",
          field: row => row.rol,
          format: val => `${val}`,
          sortable: true
        }
      ],
      data: [
        {
          id: 1,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          usuario: "xdoe",
          rol: "Monitor"
        },
         {
          id: 2,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          usuario: "xdoe",
          rol: "Jefe Cocina"
        },
          {
          id: 3,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          usuario: "xdoe",
          rol: "Monitor"
        },
          {
          id: 4,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          usuario: "xdoe",
          rol: "Monitor"
        },
          {
          id: 5,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          usuario: "xdoe",
          rol: "Monitor"
        },
          {
          id: 6,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          usuario: "xdoe",
          rol: "Monitor"
        },
      ]
    };
  },
  methods: {
    rowclick: function(evt, row) {
      console.log(evt, row);
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    }
  }
};
</script>


