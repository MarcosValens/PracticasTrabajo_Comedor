<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click.capture="drawerClick"
          @click="drawer = !drawer"
        />
        <q-avatar>
          <q-img src="~/assets/esliceu-logo.png" alt="Logo de el liceu"/>
        </q-avatar>
        <q-toolbar-title>Menjador App</q-toolbar-title>


        <q-btn icon="far fa-user" outline round>
          <q-menu class="">
            <q-list style="width: 220px">
              <q-item>
                <q-item-section class="text-black">{{loguedUser.nom}} {{loguedUser.cognoms}}</q-item-section>
              </q-item>
              <q-separator inset=""/>
              <q-item clickable v-close-popup @click="cambiarContrasenya=true">
                <q-item-section avatar>
                  <q-avatar icon="lock" text-color="black"/>
                </q-item-section>
                <q-item-section class="text-black">Canviar contrasenya</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/login">
                <q-item-section avatar>
                  <q-avatar icon="supervisor_account"/>
                </q-item-section>
                <q-item-section>Canviar de compte</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="disconnect">
                <q-item-section avatar class="text-black">
                  <q-avatar icon="exit_to_app"/>
                </q-item-section>
                <q-item-section class="text-black">
                  Desconectarse
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="roles.includes('cuiner') || roles.includes('monitor')"
      v-model="drawer"
      show-if-above
      bordered
      :mini="!drawer || miniState"
      :content-class="$q.screen.height>489?'bg-grey-2 column justify-between':'bg-grey-2'"
    >
      <q-list>
        <q-item clickable v-ripple v-for="link in links" :key="link.title" :to="link.link" v-if="canAccess(link)">
          <q-item-section avatar>
            <q-icon :name="link.icon"/>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" style="font-size: 1.2em">{{link.title}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color=primary
          icon="chevron_left"
          @click="miniState = true"
        ></q-btn>
      </div>

      <div class="q-pa-md">
        <q-separator class="q-mb-md"/>
        <div class="flex justify-end">
          <q-btn dense color="secondary" outline icon-right="exit_to_app" label="Desconnectar-se" @click="disconnect"/>
        </div>
      </div>

      <template v-slot:mini>
        <q-list class="">
          <q-item clickable v-ripple v-for="link in links" :key="link.title" :to="link.link">
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-tooltip :delay="150"
                       transition-hide="slide-left" anchor="center right" self="center left">
              {{link.title}}
            </q-tooltip>
          </q-item>
        </q-list>

        <div>
          <q-separator class="q-mb-md"/>
          <div class="flex flex-center q-mb-md">
            <q-btn dense color="secondary" outline icon-right="exit_to_app" @click="disconnect">
              <q-tooltip
                transition-hide="slide-left" content-class="bg-secondary" anchor="center right" self="center left">
                Desconnectar-se
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-dialog position="right" v-model="cambiarContrasenya" @before-hide="clearPasswordManager">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6 text-weigth-light">Canviar contrasenya</div>
        </q-card-section>
        <q-separator inset=""/>
        <q-card-section>
          <q-input label="Contrasenya antigua" outlined class="q-my-xs" v-model="passwordmanager.oldpasswd"
                   :type="passwordmanager.showOld?'text':'password'">
            <template v-slot:append>
              <q-icon
                :name="!passwordmanager.showOld ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="passwordmanager.showOld = !passwordmanager.showOld"
              />
            </template>
          </q-input>
          <q-input label="Contrasenya nova" outlined class="q-my-xs" v-model="passwordmanager.newpasswd"
                   :type="passwordmanager.showNew?'text':'password'">
            <template v-slot:append>
              <q-icon
                :name="!passwordmanager.showNew ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="passwordmanager.showNew = !passwordmanager.showNew"
              />
            </template>
          </q-input>
          <q-input label="Repetir contrasenya" outlined class="q-my-xs" v-model="passwordmanager.newpasswd2"
                   :type="passwordmanager.showNew1?'text':'password'">
            <template v-slot:append>
              <q-icon
                :name="!passwordmanager.showNew1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="passwordmanager.showNew1 = !passwordmanager.showNew1"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-separator inset=""/>

        <q-card-actions align="right">
          <q-btn label="desar" @click="changePasswd" color="blue-9" unelevated v-close-popup/>
          <q-btn label="cancelar" @click="clearPasswordManager" flat color="red-9" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="indigo-10"
      size="3px"
    />
  </q-layout>
</template>

<script>

  export default {
    name: "MainLayout",

    components: {},


    data() {
      return {
        links: [
          {
            title: "Inici",
            icon: "home",
            link: "/private/inici",
            grantedRoles: [process.env.MONITOR_ROL, process.env.CUINER_ROL]
          },
          {
            title: "Alumnes",
            icon: "school",
            link: "/private/alumnes",
            grantedRoles: [process.env.MONITOR_ROL, process.env.CUINER_ROL]
          },
          {
            title: "Dies",
            icon: "wb_sunny",
            link: "/private/dies",
            grantedRoles: [process.env.MONITOR_ROL, process.env.CUINER_ROL]
          },
          {
            title: "Pasar llista",
            icon: "list_alt",
            link: "/private/llista",
            grantedRoles: [process.env.MONITOR_ROL, process.env.CUINER_ROL]
          },
          {
            title: "Exportar dades",
            icon: "picture_as_pdf",
            link: "/private/exportacio",
            grantedRoles: [process.env.MONITOR_ROL, process.env.CUINER_ROL]
          },
        ],
        drawer: false,
        miniState: false,
        roles: [],
        loguedUser: {
          nom: "",
          cognoms: "",
          email: ""
        },
        cambiarContrasenya: false,
        passwordmanager: {
          oldpasswd: '',
          newpasswd: '',
          newpasswd2: '',
          showOld: false,
          showNew: false,
          showNew1: false
        }
      };
    },

    methods: {
      canAccess(link) {
        const granted = link.grantedRoles;

        let result = false;
        this.roles.forEach(rol => {
          granted.forEach(aceptado => {
            if (rol === aceptado) result = true;
          })
        })
        return result;
      },
      drawerClick(e) {
        if (this.miniState) {
          this.miniState = false;
          e.stopPropagation();
        }
      },
      disconnect() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("rol")
        this.$router.push("/login")
      },
      async changePasswd() {
        const response = await this.$axiosCore.put('private/auth/password', this.passwordmanager)
        if (response.status === 200) this.notifyPositive("Contrasenya modificada correctament")
        else this.notifyNegative("Ha habido un error")
      },
      clearPasswordManager() {
        this.passwordmanager.oldpasswd = ''
        this.passwordmanager.newpasswd = ''
        this.passwordmanager.newpasswd2 = ''
      },
      notifyNegative(message) {
        this.$q.notify({
          message: message,
          color: 'primary',
          position: 'bottom-left'
        })
      },
      notifyPositive(message) {
        this.$q.notify({
          message: message,
          color: 'positive',
          position: 'bottom-left'
        })
      }
    },
    async created() {
      /**
       * Cogemos la informacion propia del usuario logueado
       */
      this.roles = JSON.parse(localStorage.getItem('rol'))

      const response = await this.$axiosCore.get("/private/usuario/me");
      console.log(response)
      if (response.status === 200) {
        this.loguedUser.nom = response.data.nombre;
        this.loguedUser.cognoms = response.data.apellido1 + ' ' + response.data.apellido2;
      }
    },
  };
</script>
<style>

</style>>
