<template>
  <q-page :class="$q.screen.gt.sm?'q-pa-xl bg-grey-2  flex flex-center':'q-pa-xs bg-grey-2'">


    <div class="flex flex-center column">

      <div class="row content-center">
        <q-date
          v-model="dataInici"
          first-day-of-week="1"
          today-btn
          mask="YYYY-MM-DD"
          title="Inici"
          subtitle="Seleccionar día"
        />
        <q-date
          v-model="dataFi"
          first-day-of-week="1"
          today-btn
          mask="YYYY-MM-DD"
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

    <q-dialog v-model="dialogSenseDades">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            No hi ha dades per els dies o els grups seleccionats.
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
  import * as jsPDF from 'jspdf'

  export default {
    name: "ExportacioDades",
    data() {
      return {
        grupsSelect: [],
        grupsSeleccionats: [],
        dialogExportacioCompleta: false,
        dialogSenseDades: false,
        dataInici: Date.now(),
        dataFi: Date.now()
      }
    },
    async created() {
      let timeStamp = Date.now()
      let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD');
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
      async exportar() {
        let peticioAlumnes = await this.$axiosCore.get(`/private/getAlumnesFrom/${this.dataInici}/from/${this.dataFi}`);
        if (peticioAlumnes.status === 200){
          let alumnes = peticioAlumnes.data;

          // Si hay grupos seleccionados, se guardan los alumnos de esos grupos.
          if (this.grupsSeleccionats.length !== 0) {
            let alumnesSeleccionats = [];
            alumnes.forEach(alumne => {
              this.grupsSeleccionats.forEach(grup => {
                if (alumne.alumne.grup.codi === grup.codi){
                  alumnesSeleccionats.push(alumne);
                }
              })
            })
            alumnes = alumnesSeleccionats;
          }

          // Se ordenan los alumnos por grupo.
          alumnes.sort(function (a, b) {
            return a.alumne.grup.codi - b.alumne.grup.codi || a.alumne.ap1.charCodeAt(0) - b.alumne.ap1.charCodeAt(0);
          });

          if (alumnes.length > 0){
            this.dialogExportacioCompleta = true;
            this.generarPDF(alumnes);
          } else {
            this.dialogSenseDades = true;
          }
        }
      },
      generarPDF(alumnes) {
        let doc = new jsPDF({
          orientation: 'landscape',
        });

        let yPos = 30;

        this.encapcalaments(doc);

        for (let i = 0; i < alumnes.length; i++) {
          let alumne = alumnes[i].alumne;
          let data = alumnes[i].data;
          let usuariApp = alumnes[i].usuariApp;

          // Página por grupo.
          if (i > 0 && alumnes[i].alumne.grup.curs.codi !== alumnes[i-1].alumne.grup.curs.codi){
            yPos = 30;
            doc.addPage();
            this.encapcalaments(doc);
          } else if(yPos >= 190) {
            yPos = 30;
            doc.addPage();
            this.encapcalaments(doc);
          }

          doc.text(alumne.ap1 + " " + alumne.ap2 + " " + alumne.nom + " ", 20, yPos);
          doc.text(alumne.grup.curs.descripcio + " " + alumne.grup.nom, 90, yPos);
          doc.text(data, 130, yPos);
          doc.text(usuariApp.nombre + " " + usuariApp.apellido1 + " " + usuariApp.apellido2, 180, yPos);
          // Final de página.

          yPos += 10;
        }
        doc.save();
      },
      encapcalaments(doc) {
        doc.setFontSize(15);
        doc.text("Nom i cognoms alumne", 20, 20);
        doc.text("Curs i grup", 90, 20);
        doc.text("Data marcatje", 130, 20);
        doc.text("Usuari que ha marcat", 180, 20);
        doc.setFontSize(8);
      }
    }
  }
</script>

<style scoped>

</style>
