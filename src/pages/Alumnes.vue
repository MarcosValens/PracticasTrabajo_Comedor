<template>
  <q-page class="q-pa-md">
    <div class="column" style="width: 80%; margin-left: 10%">
      <div class="col">
        <div class="row justify-between q-mb-md">
          <div class="col-3">
            <q-input v-model="filter.nom" label="Nom" @input="filterAlumnes"/>
          </div>
          <div class="col-3">
            <q-input v-model="filter.ap1" label="Primer Cognom" @input="filterAlumnes"/>
          </div>
          <div class="col-3">
            <q-input v-model="filter.ap2" label="Segon Cognom" @input="filterAlumnes"/>
          </div>
        </div>
      </div>
      <div class="col">
        <q-table
      title="Alumnes"
      :data="alumnesFiltered"
      :columns="columns"
        @row-click="onRowClick"
    >
    </q-table>
      </div>
    </div>
   
  </q-page>
</template>


<script>
export default {
  name: "PagesAlumne",
  data() {
    return {
      filter: {
        nom: "",
        ap1: "",
        ap2: ""
      },
      columns: [
        {
          name: "codi",
          required: true,
          label: "Codi",
          align: "rleft",
          field: row => row.codi,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "nom",
          required: true,
          label: "Nom",
          align: "right",
          field: row => row.nom,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "ap1",
          required: true,
          label: "Primer cognom",
          align: "center",
          field: row => row.ap1,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "ap2",
          required: true,
          label: "Segon cognom",
          align: "center",
          field: row => row.ap2,
          format: val => `${val}`,
          sortable: true
        }
      ],
      alumnes: [],
      alumnesFiltered: []
    };
  },
  beforeCreate() {
    /** UNTESTED */
    this.$axios.get(this.$env.BACKEND_URL + "/alumnes").then(function(alumnes) {
      this.alumnes = alumnes
      this.alumnesFiltered = alumnes
    })
  },
  methods: {
      onRowClick: function (evt, row) {
          this.$router.push(`/alumne/${row.codi}`)
      },
      filterAlumnes(){
        this.alumnesFiltered = this.alumnes.filter(alumne => alumne.nom.includes(this.filter.nom) && alumne.ap1.includes(this.filter.ap1) && alumne.ap2.includes(this.filter.ap2))
      }
  }
};
</script>