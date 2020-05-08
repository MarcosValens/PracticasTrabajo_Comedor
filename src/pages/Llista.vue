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
      <template slot="top" >
        <div class="row  justify-between" style="width: 100%;">
          <div class="col">
              <q-input v-model="search.nom" label="Nom" />
          </div>
          <div class="col">
              <q-input v-model="search.cognoms.primer" label="Primer Cognom" />
          </div>
           <div class="col">
               <q-input v-model="search.cognoms.segon" label="Segon Cognom" />
          </div>
        </div>
      </template>
    </q-table>
    <div class="row justify-end">
        <div class="col-1">
            <q-btn color="primary" label="Guardar" />
        </div>
    </div>
  </q-page>
</template>


<script>
export default {
  name: "PagesLlista",
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
          name: "codi",
          required: true,
          label: "Codi",
          align: "left",
          field: row => row.codi,
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
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          rol: "Professor"
        },
        {
          codi: 213223,
          nom: "Roberto",
          ap1: "Caprio",
          ap2: "Doe",
          rol: "Alumne"
        },
        {
          codi: 3131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          rol: "Professor"
        },
        {
          codi: 413223,
          nom: "Roberto",
          ap1: "Caprio",
          ap2: "Doe",
          rol: "Alumne"
        },
        {
          codi: 5131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          rol: "Professor"
        },
        {
          codi: 613223,
          nom: "Roberto",
          ap1: "Caprio",
          ap2: "Doe",
          rol: "Alumne"
        },
        {
          codi: 7131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          rol: "Professor"
        },
        {
          codi: 813223,
          nom: "Roberto",
          ap1: "Caprio",
          ap2: "Doe",
          rol: "Alumne"
        },
        {
          codi: 9131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe",
          rol: "Professor"
        },
        {
          codi: 1013223,
          nom: "Roberto",
          ap1: "Caprio",
          ap2: "Doe",
          rol: "Alumne"
        }
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