<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="form">
      <q-form>
        <q-input
          filled
          type="text"
          v-model="email"
          label="El teu email"
          class="input"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="La teva contrasenya"
          class="input"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                email: '',
                password: ''
            }
        }
    }
</script>

<style>
  .form{
    border-style: groove;
    width: 25%;
  }
  .input{
    margin-top: 10%;
    margin-bottom: 10%;
  }
</style>
