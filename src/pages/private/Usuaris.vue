<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Usuaris</div>
    <div class="row">
      <div class="col-lg-9 col-12  q-pa-sm">
        <q-table
          title="Pasar llista"
          :data="usuarisFiltered"
          :columns="columns"
          row-key="codi"
          rows-per-page-label="Usuaris per fila"
          :rows-per-page-options="[5,12,0]"
          separator="cell"
        >
        <template v-slot:top class="bg-indigo">
            <div :class="$q.screen.gt.md?'full-width flex justify-between':'full-width'">
              <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                        v-model="usuarioSeleccionado"
                        :options="usuarios" label="Usuari"
                        @input="filterUsuari(filtroDeUsuarios)"/>
              <q-input :class="$q.screen.lt.lg?'full-width q-mb-sm':''" outlined dense debounce="300"
                       v-model="filtroDeUsuarios" placeholder="Cerca"
                       @input="filterUsuari">
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
  name: "PagesUsuaris",
  async created(){
    const responseUsuaris = await this.$axiosCore.get("/admin/usuaris");
  },
  data() {
    return {
      usuarisFiltered: '',
      usuarioSeleccionado: '',
      usuarios: [],
      filtroDeUsuarios: '',
      filter: {
        nom: null,
        cognoms: {
          primer: null,
          segon: null
        }
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
          name: "usuario",
          required: true,
          label: "Usuario",
          align: "center",
          field: row => row.usuario,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "rol",
          required: true,
          label: "Tipo",
          align: "center",
          field: row => row.rol,
          format: val => `${val}`,
          sortable: true
        }
      ],
      usuaris: [],
      usuarisFiltered: []

    };
  },
  methods: {
    filterUsuari(){
      console.log("filtracio");
    }
  }
};
</script>


