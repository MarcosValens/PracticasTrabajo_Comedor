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
          <q-img src="~/assets/esliceu-logo.png" alt="Logo de el liceu"/>
        </q-avatar>
        <q-toolbar-title>Menjador App</q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
    show-if-above bordered
    content-class="bg-grey-1"
    :mini="!drawer || miniState"
    >
      <q-list>
        <q-item clickable v-ripple v-for="link in links" :key="link.title" :to="link.link" >
          <q-item-section avatar >
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" style="font-size: 1.2em">{{link.title}}</q-item-label>
          </q-item-section>
        </q-item>

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
          link: "/inici"
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
<style >

</style>>
