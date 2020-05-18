<template>
  <q-page
    :class="$q.screen.lt.md?'bg-sm-image window-height window-width row justify-center items-center':'bg-lg-image window-height window-width row justify-center items-center'"
    >
    <div class="column">
      <div class="row">
        <h5 class="text-h5  q-my-md">Menjador - Es Liceu</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
              <q-input class="q-my-sm" outlined  v-model="login.email" type="email" label="email" />
              <q-input class="q-my-sm" outlined  v-model="login.password"  label="password"
                       :type="!verContrasena ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="!verContrasena ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="verContrasena = !verContrasena"
                  />
                </template>
            </q-input>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width" label="Login"  @click="doLogin"/>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        login:{
          email: '',
          password: '',
        },
        verContrasena: false
      }
    },
    methods: {
      async doLogin(){
        const responseLogin = await this.$axiosCore.post('/login'); // TODO PONER EL PATH DEL LOGIN
        if (responseLogin.status===200){
          // Ok, guardamos tokens y a parte privada
        }else {
          // No ok
          this.notify('Email o contraseña incorrecto')
          this.login.email = '';
          this.login.password = '';
        }
      },
      notify(message){
        this.$q.notify({
          message: message,
          color: 'primary',
          position: 'bottom-left'
        })
      }
    }
  }
</script>

<style>
  .q-card {
    width: 360px;
  }
  .bg-lg-image {
    background-image: url("assets/esliceu-logo.png");
    background-repeat: no-repeat;
    background-position: 95% 100%;
    background-size: 13vw;
  }
  .bg-sm-image {
    background-image: url("assets/esliceu-logo.png");
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 75vw;
  }
</style>
