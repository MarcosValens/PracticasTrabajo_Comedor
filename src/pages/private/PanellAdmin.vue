<template>
  <q-page>

    <div class="row justify-center">

      <template>
        <div class="q-pa-md">
          <q-uploader
            color="primary"
            label="Pujar el XML"
            auto-upload
            :url="urlSubirXML"
            @uploaded="xmlSubido"
            method="PUT"
            style="max-width: 260px"
            fieldName="file"
            :max-file-size="10485760"
          />
        </div>
      </template>
    </div>

  </q-page>
</template>

<script>
  export default {
    name: "PanellAdmin",
    data(){
      return{
        urlSubirXML:"http://localhost:8080/uploadxml"
      }
    },
    methods:{
      xmlSubido(){

        console.log("XML subido");
      }
    }
  }
</script>

<style scoped>

</style>
