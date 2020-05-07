<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Professors</div>
        <q-list bordered separator>
          <q-item v-for="professor in professors">
            <q-item-section>{{professor}}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Alumnes</div>
        <q-list bordered separator>
          <q-item v-for="alumne in alumnes">
            <q-item-section>{{alumne}}</q-item-section>

          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                professors: ["Joan Galmés", "Xavi Torrens", "Manuel Martínez"],
                alumnes: ["Miki Pons", "Jordi Gago", "Joan Antoni Pacheco", "Miguel Ángel Arrones"]
            }
        }
    }
</script>
<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 350px
</style>
