<template>
  <q-page :class="$q.screen.gt.sm?'q-pa-xl':'q-pa-xs q-pt-md'">

    <div :class="$q.screen.gt.md?'full-width flex justify-between q-px-sm':'full-width q-px-sm'">
      <div v-if="$q.screen.gt.md">
        <q-btn color="primary" @click="uploadXML=!uploadXML" unelevated label="Actualitzar CORE via XML"
               icon="far fa-file-excel" :class="$q.screen.gt.md?'q-mx-xs':'q-mx-xs q-mb-md full-width'"/>

        <q-btn color="primary" outline unelevated label="Afegir usuari" @click="dialogAfegisUsuari=true"
               icon="add" :class="$q.screen.gt.md?'q-mx-xs':'q-mx-xs q-mb-md full-width'"/>
      </div>
      <div v-if="!$q.screen.gt.md">
        <q-btn label="acciones" unelevated color="primary" icon-right="keyboard_arrow_down" class="full-width q-mb-md">
          <q-menu fit>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="uploadXML=!uploadXML">
                <q-item-section avatar>
                  <q-icon name="far fa-file-excel"/>
                </q-item-section>
                <q-item-section class="">ACTUALITZAR CORE VIA XML</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="dialogAfegisUsuari=true">
                <q-item-section avatar>
                  <q-icon name="add"/>
                </q-item-section>
                <q-item-section>AFEGIR USUARI</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>

    <div class="row   q-pa-sm">


      <q-table
        class="full-width" :data="dataProfesoresFiltered" :columns="columnsProfesores" row-key="name" separator="cell"
      >
        <template v-slot:top class="bg-indigo">
          <div :class="$q.screen.gt.md?'full-width flex justify-between':'full-width'">
            <div class="text-h5">Professors</div>
            <q-input outlined dense debounce="300" placeholder="Cercar" @input="filterProfesor"
                     v-model="filtroProfesor">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>

          </div>
        </template>

        <template v-slot:body="props">

          <q-tr :props="props">
            <q-td key="username" :props="props">{{props.row.username}}</q-td>
            <q-td key="nom" :props="props">{{props.row.nom}}</q-td>
            <q-td key="apellido" :props="props">{{props.row.ap1}}</q-td>
            <q-td key="apellido2" :props="props">{{props.row.ap2}}</q-td>
            <q-td key="email" :props="props" style="max-width: 200px">
              <q-input dense v-model="props.row.email" outlined label="Asignar email" class="full-width">
                <template v-slot:append>
                  <q-btn class="q-mx-xs" round size="sm" color="green-9" icon="fas fa-save"
                         @click="asignarEmail((props.row))"
                         :disable="!(props.row.email!==undefined && props.row.email!=='')"
                         v-show="(props.row.email!==undefined && props.row.email!=='')"/>
                  <q-btn outline class="q-mx-xs" round size="sm" color="red-9" icon="far fa-trash-alt"
                         @click="removeEmailUser(props.row)"
                         :disable="!(props.row.email!==undefined && props.row.email!=='')"
                         v-show="(props.row.email!==undefined && props.row.email!=='')"/>
                </template>
              </q-input>
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </div>


    <q-dialog v-model="uploadXML" @before-hide="fileXml=null">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Escollir arxiu xml
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


    <q-dialog v-model="dialogAfegisUsuari" @before-hide="clearNewUsuari" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h5">
            Afegir usuari
          </div>
        </q-card-section>
        <q-separator inset=""/>
        <q-card-section>
          <div class="text-h6 text-weight-light">
            Informació
          </div>
          <q-input v-model="usuarioToAdd.nombre" placeholder="Nom" outlined dense class="q-my-sm"/>
          <div class="row q-my-sm full-width no-wrap">
            <q-input v-model="usuarioToAdd.apellido1" placeholder="Cognom" outlined dense class="q-pr-xs"/>
            <q-input v-model="usuarioToAdd.apellido2" placeholder="Segon cognom" outlined dense class=" q-pl-xs"/>
          </div>
          <q-input v-model="usuarioToAdd.email" placeholder="Email" outlined dense class="q-my-sm">

            <template v-slot:append>
              <q-icon name="far fa-envelope"></q-icon>
            </template>
          </q-input>
          <q-input v-model="usuarioToAdd.contrasenya" outlined dense
                   :type="usuarioToAdd.showContrasenya ? 'text' : 'password'" placeholder="Contrasenya" class="q-my-sm">
            <template v-slot:append>
              <q-icon
                :name="!usuarioToAdd.showContrasenya ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="usuarioToAdd.showContrasenya = !usuarioToAdd.showContrasenya"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-separator inset=""/>
        <q-card-section>
          <div class="text-h6 text-weight-light">
            Rols
          </div>
          <q-checkbox size="md" v-model="usuarioToAdd.roles" val="Cuiner" label="Cuiner"/>
          <q-checkbox size="md" v-model="usuarioToAdd.roles" val="Monitor" label="Monitor"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup label="cancelar" unelevated outline color="primary"/>
          <q-btn v-close-popup label="Desar" @click="saveNewUsuari" unelevated color="green-9"/>
        </q-card-actions>
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
        dialogAfegisUsuari: false,
        usuarioToAdd: {
          nombre: '',
          apellido1: '',
          apellido2: '',
          email: '',
          contrasenya: '',
          roles: [],
          showContrasenya: false
        },
        columnsProfesores: [
          {name: 'username', align: 'center', label: 'Nom d\'usuari', field: row => row.username, sortable: true},

          {
            name: 'nom',
            required: true,
            label: 'Nom',
            align: 'left',
            field: row => row.nom,
            sortable: true,
          },
          {name: 'apellido', align: 'left', label: 'Cognom', field: row => row.ap1, sortable: true},
          {name: 'apellido2', align: 'left', label: 'Segon cognom', field: row => row.ap2, sortable: true},
          {name: 'email', align: 'center', label: 'Email', field: row => row.email, sortable: true},

        ],
        dataProfesores: [],
        dataProfesoresFiltered: []
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
      },
      async removeEmailUser(profesor) {
        const codigo = profesor.codi;

        // Aqui hacemos que el email no se vea mas en la lista
        profesor.email = undefined

        const response = await this.$axiosCore.delete('/admin/professor/email', {
          data: {
            codi: codigo
          }
        })

        if (response.status === 200) {
          this.notify("Email eliminado correctamente")
        } else {
          this.notify(response.data);
        }
      },
      clearNewUsuari() {
        this.usuarioToAdd.nombre = '';
        this.usuarioToAdd.apellido1 = '';
        this.usuarioToAdd.apellido2 = '';
        this.usuarioToAdd.email = '';
        this.usuarioToAdd.contrasenya = '';
        this.usuarioToAdd.roles = [];
        this.usuarioToAdd.showContrasenya = false;
      },
      async saveNewUsuari() {

        const response = await this.$axiosCore.post('/admin/auth/register', this.usuarioToAdd);
        if (response.status === 200) {
          this.clearNewUsuari();
          this.notify("Usuari desat correctament")
        }
      }
    }

  }
</script>

<style scoped>

</style>
