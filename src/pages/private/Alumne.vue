<template>
  <q-page>
    <div class="col-lg-4 col-md-4 col-sm-12 col-12 q-pa-lg column">
      <q-card class="column content-center">
        <q-card-section class="flex flex-center">
          <div class="text-h3">Datos del Alumno</div>
        </q-card-section>
        <q-card-section class="flex flex-center">
          <q-avatar size="10em" class="">
            <q-img :src="alumne.foto" :ratio="1"
                   alt="Imagen de perfil del usuario"
                   placeholder-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRr1v58ICPpgv8t4zeWFfmJqBre8Xedi8agxMpKEHR-G5L06sic"
                   spinner-color="primary"
            />
          </q-avatar>
        </q-card-section> 
        <q-card-section class="flex flex-center">
          <div class="text-h4">{{alumne.nom}} {{alumne.ap1}} {{alumne.ap2}}</div>
        </q-card-section>   
        <q-card-section class="flex flex-center">
            <div class="text-h4">Tutors</div>
        </q-card-section>
        <q-card-section>
            <div v-for="tutor in alumne.tutors" v-bind:key="tutor.codi">
              <div class="text-h6 text-weight-regular">{{tutor.relacio}} : {{tutor.nom}} {{tutor.ap1}} {{tutor.ap2}}</div>
            </div>
        </q-card-section>         

      </q-card> 
    </div>
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
                    foto: '',
                    tutors: [],
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
            const responseAlumne = await this.$axiosCore.get("/private/alumno/"+this.$route.params.id);
            let alumne = responseAlumne.data;
            this.alumne.nom = alumne.nom;
            this.alumne.ap1 = alumne.ap1;
            this.alumne.ap2 = alumne.ap2;
            let tutores = [];
            alumne.tutorsAlumnes.forEach(tutor => {
              console.log(tutor)
              let newTutor = {
                relacio: tutor.relacio,
                codi: tutor.tutor.codi,
                nom: tutor.tutor.nom,
                ap1: tutor.tutor.llinatge1,
                ap2: tutor.tutor.llinatge2
              }
              tutores.push(newTutor);
            });
            this.alumne.tutors = tutores;
 
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
