<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="~/assets/esliceu-logo.png">
        </q-avatar>
        <q-toolbar-title>
          Menjador App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'

    export default {
        name: 'LoginLayout',

        components: {
            EssentialLink
        },

        data () {
            return {
            }
        }
    }
</script>
