<template>
  <q-page class="q-pa-md">
    <div class="text-h4 ">Alumnes</div>
    <div class="row">
      <div class="col-lg-9 col-12  q-pa-sm">
        <q-table
          :data="alumnesFiltered"
          :columns="columns"
          @row-click="onRowClick"
          row-key="codi"
          rows-per-page-label="Alumnos por fila"
          :rows-per-page-options="[5,12,0]"
          separator="cell"
        >
          <template v-slot:top class="bg-indigo">
            <div :class="$q.screen.gt.md?'full-width flex justify-between':'full-width'">
              <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                        v-model="grupoSeleccionado"
                        :options="grups" label="Grupo"
                        @input="filterAlumnes(filtroDeAlumnos)"/>

              <q-input :class="$q.screen.lt.lg?'full-width q-mb-sm':''" outlined dense debounce="300"
                       v-model="filtroDeAlumnos" placeholder="Search"
                       @input="filterAlumnes">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </div>
          </template>

        </q-table>
      </div>
    </div>
  </q-page>
</template>


<script>
export default {
  name: "PagesAlumne",
  async created() {
    const responseAlumnes = await this.$axiosCore.get( "/private/alumnos");
    console.log(responseAlumnes);
    this.alumnes = responseAlumnes.data.map(alumno => {
      const newAlumno = {
        nom: alumno.nom,
        ap1: alumno.ap1,
        ap2: alumno.ap2,
        grup: "",
        codi: alumno.codi,
      }
      let grupo;
      if(alumno.grup != null && typeof alumno.grup === 'object'){
        grupo = alumno.grup.curs.descripcio + "-" + alumno.grup.nom
      } else if (alumno.grup != null && typeof alumno.grup != 'object'){
        grupo = alumno.grup;
      }
      newAlumno.grup = grupo;
      return newAlumno;
    });
    this.alumnesFiltered = this.alumnes;
     const responseGrups = await this.$axiosCore.get( "/private/grupos");
     this.grups = responseGrups.data.map(grup => {
       return grup.curs.descripcio +"-"+grup.nom;
     });     
     this.grups.unshift("Todos");
  },
  data() {
    return {
      grups: [],
      grupoSeleccionado: 'Todos',
      alumnesFiltered: '',
      filtroDeAlumnos: '',
      filter: {
        nom: "",
        ap1: "",
        ap2: "",
        grup: "",
      },
      columns: [
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
        },
        {
          name: "grup",
          required: true,
          label: "Grup",
          align: "center",
          field: row => row.grup,
          format: val => `${val}`,
          sortable: true
        },
      ],
      alumnes: [],
      alumnesFiltered: []
    };
  },
  methods: {
      onRowClick: function (evt, row) {
          this.$router.push(`alumne/${row.codi}`)
      },
      filterAlumnes(){
        const textoFiltro = this.filtroDeAlumnos.toLowerCase();
        this.alumnesFiltered = this.alumnes.filter(alumne => {
          const nombreCompleto = alumne.nom + ' ' + alumne.ap1 + ' ' + alumne.ap2;

          if(this.grupoSeleccionado.toLowerCase() !== 'todos' && this.grupoSeleccionado !== alumne.grup) return false
          return nombreCompleto.toLowerCase().includes(textoFiltro);
        })      
      },
  }
};
</script>
