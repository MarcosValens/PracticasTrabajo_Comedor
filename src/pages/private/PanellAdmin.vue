<template>
  <q-page class="q-pa-xl">

    <div :class="$q.screen.gt.md?'full-width flex justify-between q-px-sm':'full-width q-px-sm'">
      <div>
        <q-btn color="primary" @click="uploadXML=!uploadXML" unelevated label="Actualizar CORE via XML"
               icon="far fa-file-excel" :class="$q.screen.gt.md?'q-mx-xs':'q-mx-xs q-mb-md full-width'"/>
      </div>
      <q-input outlined dense debounce="300" placeholder="Search" @input="filterProfesor" v-model="filtroProfesor">
        <template v-slot:prepend>
          <q-icon name="search"/>
        </template>
      </q-input>
    </div>

    <div class="row  q-mt-sm q-pa-sm">
      <q-table
        class="full-width" :data="dataProfesoresFiltered" :columns="columns" row-key="name" separator="cell"
        :pagination="{
          rowsPerPage: 10
        }" :rows-per-page-options="[0,12,15]"
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props">{{props.row.username}}</q-td>
            <q-td key="nom" :props="props">{{props.row.nom}}</q-td>
            <q-td key="apellido" :props="props">{{props.row.ap1}}</q-td>
            <q-td key="apellido2" :props="props">{{props.row.ap2}}</q-td>
            <q-td key="email" :props="props">
              {{props.row.email}}
              <q-popup-edit v-model="props.row.email" label-set="Asignar email" label-cancel="Cancelar" buttons
                            @save="asignarEmail(props.row)">
                <q-input outlined label="email" v-model="props.row.email" dense autofocus/>
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>


    <q-dialog v-model="uploadXML" @before-hide="fileXml=null">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Escoger archivo xml
          </div>
        </q-card-section>
        <q-card-section>
          <q-file
            v-model="fileXml"
            label="Escoger archivo (xml)"
            outlined
            use-chips
            style="max-width: 300px"
            accept=".xml"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file"/>
            </template>
            <template v-slot:after>
              <q-btn
                :disable="fileXml==null || fileXml.length==0"
                color="primary"
                dense
                icon="cloud_upload"
                round
                :loading="uploadingXml"

                @click="uploadXml"
              />
            </template>
          </q-file>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  export default {
    name: "PanellAdmin",
    async created() {

      this.$q.loading.show()
      const response = await this.$axiosCore.get('/private/professor');
      if (response.status === 200) {
        this.dataProfesores = response.data;
        this.dataProfesoresFiltered = this.dataProfesores;
      } else {
        this.notify(response.data)
      }
      this.$q.loading.hide()


    },
    data() {
      return {
        filtroProfesor: '',
        fileXml: null,
        uploadXML: false,
        uploadingXml: false,
        columns: [
          {name: 'username', align: 'center', label: 'Username', field: row => row.username, sortable: true},

          {
            name: 'nom',
            required: true,
            label: 'Nombre',
            align: 'left',
            field: row => row.nom,
            sortable: true,
          },
          {name: 'apellido', align: 'left', label: 'Apellido', field: row => row.ap1, sortable: true},
          {name: 'apellido2', align: 'left', label: 'Segundo apellido', field: row => row.ap2, sortable: true},
          {name: 'email', align: 'center', label: 'Email', field: row => row.email, sortable: true},

        ],
        dataProfesores: [],
        dataProfesoresFiltered: null
      }
    },
    methods: {
      async uploadXml() {
        this.uploadingXml = true;
        const formData = new FormData()
        formData.append('file', this.fileXml)

        const response = await this.$axiosCore.put('/private/uploadxml', formData)
        if (response.status === 200) {
          this.notify("XML  cargado correctamente en la base de datos")
        } else {
          this.notify(response.data)
        }
        console.log(response)
        this.uploadingXml = false;
      },
      notify(message) {
        this.$q.notify({
          message: message,
          color: 'secondary',
          position: 'bottom-left'
        })
      },
      filterProfesor(texto) {
        this.dataProfesoresFiltered = this.dataProfesores.filter(profesor => {

          if (profesor.username.toLowerCase().includes(texto.toLowerCase())) return true;
          if (profesor.email != null && profesor.email.toLowerCase().includes(texto.toLowerCase())) return true;
          const nombreCompleto = profesor.nom + ' ' + profesor.ap1 + ' ' + profesor.ap2;
          return nombreCompleto.toLowerCase().includes(texto.toLowerCase());
        })
      },
      async asignarEmail(profesor) {
        const codigo = profesor.codi;
        const email = profesor.email;
        if (codigo && email) {

          const response = await this.$axiosCore.put('/admin/professor/email', {
            email: email,
            codigo: codigo
          })

          if (response.status === 200) {
            this.notify("Email asignado correctamente")
          } else {
            this.notify(response.data);
          }

        }
      }
    }

  }
</script>

<style scoped>

</style>
