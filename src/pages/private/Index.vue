<template>
  <q-page class="flex flex-center column">
    <img
      alt="EsLiceuLogo"
      src="~assets/esliceu-logo.png"
    >

    <q-banner v-if="!roles.includes('cuiner') && !roles.includes('monitor')" rounded class="bg-primary text-white">

      L'usuari actual no té rols de Cuiner o de Monitor. Consulti a un administrador si considera que es un error.

      <template v-slot:action>
        <q-btn flat color="white" @click="disconnect" label="Desconectarse" />
      </template>
    </q-banner>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: {
    roles: []
  },
  methods: {
    disconnect() {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("rol")
      this.$router.push("/login")
    }
  },
  created() {
    this.roles = JSON.parse(localStorage.getItem('rol'))
  },
}
</script>
