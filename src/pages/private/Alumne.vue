<template>
  <q-page class="row">
    <div class="col-lg-4 col-md-4 col-sm-12 q-pa-lg column bg-indigo">
      <q-card class="column content-center">
        <q-card-section class="flex flex-center">
          <div class="text-h3">Dades de l'alumne</div>
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
     <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 q-pa-lg bg-green">
      <q-card>
        <div class="text-h4">Dies que ha vingut al menjador</div>
        <q-card-section class="overflow-auto scrollArea bg-yellow" style="height: 85%">
        <q-list>
        <q-expansion-item v-for="fichaje in allFichajes"
                          icon="fas fa-history"
                          :label="'Dia '+fichaje.dia"
                          v-bind:key="fichaje.day"
        >
        <q-card class="bg-red-1">
          <div class="text-h6">Aqui ira la info del dia que ha comido.</div>
        </q-card>
        </q-expansion-item>
        </q-list>
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
                },
                allFichajes: []
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

            let marcaje = {
              dia: "25/05/2020",
              usuario: {
                nombre: "Pablo",
                apellido1: "Navarro",
                apellido2: "Sierra"
              }
            };
            let marcaje2 = {
              dia: "24/04/2020",
              usuario: {
                nombre: "Pedro",
                apellido1: "Borrás",
                apellido2: "Vargas"
              }
            }
            this.allFichajes.push(marcaje);
            this.allFichajes.push(marcaje2);
        }
    }
</script>