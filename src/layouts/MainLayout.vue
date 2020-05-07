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
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-avatar>
        <img src="~/assets/esliceu-logo.png">
      </q-avatar>
        <q-toolbar-title>
          Menjador App
        </q-toolbar-title>

        <div> v0.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
         {
          title: 'Inici',
          icon: 'home',
          link: '/#/'
        },
        {
          title: 'Alumnes',
          icon: 'school',
          link: '/#/alumnes'
        },
        {
          title: 'Professors',
          icon: 'people',
          link: '/#/professors'
        },
        {
          title: 'Dies',
          icon: 'wb_sunny',
          link: '/#/dies'
        },
        {
          title: 'Usuaris',
          icon: 'account_circle',
          link: '/#/usuaris'
        },
        {
          title: 'Pasar llista',
          icon: 'list_alt',
          link: '/#/usuaris'
        }
      ]
    }
  }
}
</script>
