<template>
  <q-page class="q-pa-md">
    <div class="column" style="width: 80%; margin-left: 10%">
      <div class="col">
        <div class="row justify-between q-mb-md">
          <div class="col-2">
            <q-input v-model="filter.nom" label="Nom" @input="filterProfessors"/>
          </div>
          <div class="col-2">
            <q-input v-model="filter.ap1" label="Primer Cognom" @input="filterProfessors"/>
          </div>
          <div class="col-2">
            <q-input v-model="filter.ap2" label="Segon Cognom" @input="filterProfessors"/>
          </div>
        </div>
      </div>
    </div>

    <div class="col">
      <q-table title="Professors" :data="professorsFiltered" :columns="columns" @row-click="rowClick(evt, row)">

      </q-table>
    </div>
  </q-page>
</template>


<script>
    export default {
        name: "PagesAlumne",
        data() {
            return {
                filter: {
                    nom: '',
                    ap1: '',
                    ap2: ''
                },
                columns: [
                    {
                        name: "codi",
                        required: true,
                        label: "Codi",
                        align: "center",
                        field: row => row.codi,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: "nom",
                        required: true,
                        label: "Nom",
                        align: "center",
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
                professors: [
                    {
                        codi: 2131223,
                        nom: "Joan",
                        ap1: "Galmes",
                        ap2: "Riera"
                    },
                    {
                        codi: 2131223,
                        nom: "Pere",
                        ap1: "Negre",
                        ap2: "Doe"
                    },
                    {
                        codi: 2131223,
                        nom: "Xavi",
                        ap1: "Torrens",
                        ap2: "Doe"
                    },
                    {
                        codi: 2131223,
                        nom: "Fernando",
                        ap1: "Ríos",
                        ap2: "Llamazares"
                    },
                    {
                        codi: 2131223,
                        nom: "Manuel",
                        ap1: "Martinez",
                        ap2: "Doe"
                    },
                    {
                        codi: 2131223,
                        nom: "Pep",
                        ap1: "Buades",
                        ap2: "Fol"
                    }
                ],
                professorsFiltered: []
            };
        },
        methods: {
            rowClick: function (evt, row) {
                console.log(evt, row);
            },
            filterProfessors(){
                this.professorsFiltered = this.professors.filter((professor) => {
                    return professor.nom.includes(this.filter.nom) && professor.ap1.includes(this.filter.ap1) && professor.ap2.includes(this.filter.ap2);
                })
            }
        },
        created() {
            this.professorsFiltered = this.professors;
        }
    };
</script>
