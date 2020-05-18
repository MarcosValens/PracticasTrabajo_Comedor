<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
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
          <img src="~/assets/esliceu-logo.png" />
        </q-avatar>
        <q-toolbar-title>Menjador App</q-toolbar-title>

        <div>v0.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" 
    show-if-above bordered 
    content-class="bg-grey-1"
    :mini="!drawer || miniState"
    >
      <q-list>
        <router-link class="drawer-link" v-for="link in links" :key="link.title" :to="link.link">
          <q-item clickable v-ripple >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{link.title}}</q-item-section>
        </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "MainLayout",

  components: {
  },

  data() {
    return {
      leftDrawerOpen: false,
      links: [
        {
          title: "Inici",
          icon: "home",
          link: "/"
        },
        {
          title: "Alumnes",
          icon: "school",
          link: "/alumnes",
          grantedRoles: [
          ]
        },
        {
          title: "Professors",
          icon: "people",
          link: "/professors"
        },
        {
          title: "Dies",
          icon: "wb_sunny",
          link: "/dies"
        },
        {
          title: "Usuaris",
          icon: "account_circle",
          link: "/usuaris"
        },
        {
          title: "Pasar llista",
          icon: "list_alt",
          link: "/llista"
        },
        {
          title: "Panell d'administració",
          icon: "fas fa-crown",
          link: "/admin"
        }
      ],
      drawer: false,
      miniState: false,
      rol: ''
    };
  },
  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false;
        e.stopPropagation()
      }
    }
  },
  created() {
    //this.rol = localStorage.getItem('rol').toLowerCase();
  }
};
</script>
<style lang="stylus">
.drawer-link {
  color: $dark;
  text-decoration: none;
}
</style>>
