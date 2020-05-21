<template>
  <q-page>
    {{alumne.nom}}
    {{alumne.ap1}}
    {{alumne.ap2}}

  </q-page>
</template>
<script>
    export default {
        data() {
            return {
                alumne: {
                    nom: '',
                    ap1: '',
                    ap2: '',
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
        async created() {
            const responseAlumne = await this.$axiosCore.get("/private/alumno/"+this.$route.params.id)
            this.alumne = responseAlumne.data;
            console.log(this.alumne);
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
