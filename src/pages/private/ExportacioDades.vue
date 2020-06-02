<template>
  <q-page :class="$q.screen.gt.sm?'q-pa-xl bg-grey-2  flex flex-center':'q-pa-xs bg-grey-2'">


    <div class="flex flex-center column">

      <div class="row content-center">
        <q-date
          v-model="dataInici"
          first-day-of-week="1"
          today-btn
          mask="DD-MM-YYYY"
          title="Inici"
          subtitle="Seleccionar día"
        />
        <q-date
          v-model="dataFi"
          first-day-of-week="1"
          today-btn
          mask="DD-MM-YYYY"
          title="Fi"
          subtitle="Seleccionar día"
        />
      </div>

      <q-select
        bg-color="primary"
        filled
        option-value="codi"
        option-label="descripcio"
        v-model="grupsSeleccionats"
        multiple
        :options="grupsSelect"
        label="Elegir grups"
        style="width: 300px; "
        class="q-ma-sm  "
      />
      <q-btn
        color="primary"
        @click="exportar"
        style="height: 130px; width: 300px; "
        class="q-ma-sm "
      >
        <div class="text-h5 column">
          <div class="q-mb-md">
            Exportar selecció
          </div>
        </div>
      </q-btn>

    </div>

    <q-dialog v-model="dialogExportacioCompleta">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Exportació completada.
          </div>
        </q-card-section>
        <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>


</template>

<script>
  import { date } from 'quasar'
  export default {
      name: "ExportacioDades",
      data() {
        return {
          grupsSelect: [],
          grupsSeleccionats: [],
          dialogExportacioCompleta: false,
          dataInici: Date.now(),
          dataFi: Date.now()
        }
      },
      async created() {
        let timeStamp = Date.now()
        let formattedString = date.formatDate(timeStamp, 'DD-MM-YYYY');
        this.dataInici = formattedString;
        this.dataFi = formattedString;

        const responseGrupos = await this.$axiosCore.get('/private/grupos')
        if (responseGrupos.status === 200) {
          responseGrupos.data.forEach(element => {
            this.grupsSelect.push({
              codi: element.codi,
              descripcio: element.curs.descripcio + " " + element.nom
            })
          })
        }
      },
      methods: {
        exportar() {
          this.dialogExportacioCompleta = true;
          if (this.grupsSeleccionats.length > 0) {
            console.log(this.grupsSeleccionats);
          }
          console.log(this.dataInici);
          console.log(this.dataFi);
        }
      }
    }
</script>

<style scoped>

</style>
