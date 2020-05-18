<template>
  <q-page class="q-pa-xl">

    <div class="row flex justify-between q-pa-sm">
      <q-input outlined dense debounce="300" placeholder="Search">
        <template v-slot:prepend>
          <q-icon name="search"/>
        </template>
      </q-input>
      <div>
        <q-btn color="primary" unelevated label="Otra accion posible"
               class="q-mx-xs"/>
        <q-btn color="primary" @click="uploadXML=!uploadXML" unelevated label="Actualizar datos CORE via XML"
               icon="far fa-file-excel" class="q-mx-xs"/>
      </div>
    </div>
    <div class="row  q-mt-sm q-pa-sm">
      <q-table
        class="full-width" :data="dataUsers" :columns="columns" row-key="name" separator="cell" :pagination="{
          rowsPerPage: 0
        }" :rows-per-page-options="[]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">

            <q-td key="nombre" :props="props">{{props.row.name}}</q-td>
            <q-td key="apellido" :props="props">{{props.row.ap1}}</q-td>
            <q-td key="apellido2" :props="props">{{props.row.ap2}}</q-td>
            <q-td key="email" :props="props">
              {{props.row.email}}
              <q-popup-edit v-model="props.row.email" label-set="Asignar email" label-cancel="Cancelar" buttons>
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
      const response = await this.$axiosCore.get('/profesores');
      if (response.status == 200) {
        this.dataUsers = response.data;
      }else{
        this.notify(response.data)
      }
      this.$q.loading.hide()



    },
    data() {
      return {
        fileXml: null,
        uploadXML: false,
        uploadingXml: false,
        columns: [
          {
            name: 'nombre',
            required: true,
            label: 'Nombre',
            align: 'left',
            field: row => row.name,
            sortable: true,
          },
          {name: 'apellido', align: 'left', label: 'Apellido', field: row => row.ap1, sortable: true},
          {name: 'apellido2', align: 'left', label: 'Segundo apellido', field: row => row.ap2, sortable: true},
          {name: 'email', align: 'center', label: 'Email', field: row => row.email, sortable: true},

        ],
        dataUsers: null
      }
    },
    methods: {
      async uploadXml() {
        this.uploadingXml = true;
        const formData = new FormData()
        formData.append('file', this.fileXml)

        const response = await this.$axiosCore.put('/uploadxml', formData)
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
          color: 'primary',
          position: 'bottom-left'
        })
      }
    }

  }
</script>

<style scoped>

</style>
