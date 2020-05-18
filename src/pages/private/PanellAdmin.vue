<template>
  <q-page class="q-pa-xl">

    <div class="row flex justify-end q-pa-sm">
      <q-btn color="primary" @click="uploadXML=!uploadXML" unelevated label="Otra accion posible"
             icon="far fa-file-excel" class="q-mx-xs"/>
      <q-btn color="primary" @click="uploadXML=!uploadXML" unelevated label="Actualizar datos CORE via XML"
             icon="far fa-file-excel" class="q-mx-xs"/>
    </div>
    <div class="row bg-indigo q-mt-sm q-pa-sm">
      f
    </div>


    <q-dialog v-model="uploadXML">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Actualizar datos
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
    data() {
      return {
        fileXml: null,
        uploadXML: false,
        uploadingXml: false
      }
    },
    methods: {
      async uploadXml() {
        this.uploadingXml = true;

        this.uploadingXml = false;
      }
    }

  }
</script>

<style scoped>

</style>
