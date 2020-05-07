<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label caption>Nom</q-item-label>
            <q-item-label>{{alumne.nom}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>Cognoms</q-item-label>
            <q-item-label>{{alumne.ap1 + " " +alumne.ap2}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>Tutor legal</q-item-label>
            <q-item-label>{{alumne.tutorLegal.nom + " " +alumne.tutorLegal.ap1+" "+alumne.tutorLegal.ap2}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-list>
      <q-date
        v-model="date"
        :locale="myLocale"
        :events="alumne.diesUsantMenjador"
      />
      <q-item-label><p class="text-h7">Els dies marcats, son els dies que l'alumne ha usat el menjador</p></q-item-label>
    </q-list>

  </div>
</template>
<script>
    export default {
        data() {
            return {
                alumne: {
                    nom: "Miguel",
                    ap1: "Pons",
                    ap2: "Sanchez",
                    tutorLegal: {
                        nom: "Pepito",
                        ap1: "De Los",
                        ap2: "Palotes"
                    },
                    diesUsantMenjador: ["2020/05/04", "2020/05/06", "2020/05/07"],
                },
                date: '',
                myLocale: {
                    days: 'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte'.split('_'),
                    daysShort: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
                    months: 'Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split('_'),
                    monthsShort: 'Gen_Feb_Mar_Abr_Mai_Jun_Jul_Ago_Set_Oct_Nov_Dec'.split('_'),
                    firstDayOfWeek: 1
                }
            }
        },
        created() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '/' + mm + '/' + dd;
            this.date = today;
        }
    }
</script>
<style lang="sass" scoped>
  .my-card
    width: 15%
</style>
