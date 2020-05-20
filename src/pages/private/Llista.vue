<template>
  <q-page class="q-pa-md">

    <div class="flex justify-between q-pa-sm">
      <div class="text-h4 ">Pasar llista</div>
      <q-btn unelevated color="primary" v-if="$q.screen.lt.lg" class="full-width" label="Selecciones comunes"
             icon="fas fa-angle-down">
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item clickable @click="seleccionarSemanaPasada">
              <q-item-section>Igual semana pasada</q-item-section>
            </q-item>
            <q-item clickable @click="seleccionarDiaPasado">
              <q-item-section>Seleccion igual que ayer</q-item-section>
            </q-item>

          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="row">
      <div class="col-lg-9 col-12  q-pa-sm">
        <q-table
          :data="usuariosFiltrados"
          :columns="columns"
          @row-click="rowclick"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          row-key="codi"
          :selected.sync="usuariosSeleccionados"
          rows-per-page-label="Usuarios por fila"
          :rows-per-page-options="[5,12,0]"
          separator="cell"
        >
          <template v-slot:top class="bg-indigo">
            <div :class="$q.screen.gt.md?'full-width flex justify-between':'full-width'">
              <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                        v-model="tipoUsuarioSeleccionado"
                        :options="optionsTipoUsuario" label="Tipo de usuario"
                        @input="filterUsuarios(filtroDeUsuarios)"
                        :disable="soloPuedeFicharAlumnos"
              />

              <q-input :class="$q.screen.lt.lg?'full-width q-mb-sm':''" outlined dense debounce="300"
                       v-model="filtroDeUsuarios" placeholder="Search"
                       @input="filterUsuarios">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </div>
          </template>

        </q-table>
      </div>
      <div class="col-3  q-pa-sm flex justify-center" v-if="$q.screen.gt.md">
        <q-card class="fixed">
          <q-card-section>
            <div class="text-h6">
              Selecciones comunes
            </div>
          </q-card-section>
          <q-separator inset=""/>
          <q-card-section class="column q-py-lg">
            <q-btn label="Igual que la semana pasada" class="q-ma-sm" color="black" outline
                   @click="seleccionarSemanaPasada">
              <q-tooltip :delay="500" anchor="top middle" self="bottom middle" :offset="[0,3]"
                         content-class="bg-secondary" content-style="font-size: 0.7em">
                Seleccionar los mismos usuarios que el mismo dia de la semana pasada
              </q-tooltip>
            </q-btn>
            <q-btn label="Selección igual que ayer" class="q-ma-sm" color="black" outline @click="seleccionarDiaPasado">
              <q-tooltip :delay="500" anchor="top middle" self="bottom middle" :offset="[0,3]"
                         content-class="bg-secondary" content-style="font-size: 0.7em">
                Seleccionar los mismos usuarios que ayer
              </q-tooltip>
            </q-btn>

          </q-card-section>
          <q-separator inset=""/>
          <q-card-actions align="right">
            <q-btn color="primary" label="Guardar listado" icon="fas fa-pencil-alt" @click="guardarListado"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>


    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.screen.lt.lg">
      <q-btn fab-mini color="secondary" icon="far fa-save" @click="guardarListado"/>
    </q-page-sticky>

  </q-page>
</template>


<script>
  export default {
    name: "PagesLlista",
    created() {
      /*
      * TODO RECUPERAR AQUI TODOS LOS USUARIOS QUE NECESITEMOS
      * */

      this.usuariosFiltrados = this.usuariosSinFiltrar;

      /*
      * TODO: QUE ESTO VENGA DEL LOCALSTORAGE UNA VEZ LOS ROLES EN EL LOGUIN ESTEN IMPLEMENTADOS
      * */
      this.rolLogued = this.cuinerRol
      if (this.rolLogued === this.monitorRol) {
        this.tipoUsuarioSeleccionado = 'Alumne'
        this.soloPuedeFicharAlumnos = this.rolLogued === this.monitorRol;
        this.filterUsuarios(this.filtroDeUsuarios)
      }

    },
    data() {
      return {
        rolLogued: '',
        cuinerRol: process.env.CUINER_ROl,
        monitorRol: process.env.MONITOR_ROL,
        soloPuedeFicharAlumnos: false,
        fabPos: [18, 18],
        draggingFab: false,
        optionsTipoUsuario: ['Todos', 'Professor', 'Alumne'],
        tipoUsuarioSeleccionado: 'Todos',
        usuariosSeleccionados: [],
        filtroDeUsuarios: '',
        columns: [
          {
            name: "nom",
            required: true,
            label: "Nom",
            align: "left",
            field: row => row.nom,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: "ap1",
            required: true,
            label: "Primer cognom",
            align: "left",
            field: row => row.ap1,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: "ap2",
            required: true,
            label: "Segon cognom",
            align: "left",
            field: row => row.ap2,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: "rol",
            required: true,
            label: "Tipo",
            align: "left",
            field: row => row.rol,
            format: val => `${val}`,
            sortable: true
          }
        ],

        /*
        * TODO ESTOS USUARIOS HAN DE VENIR DE BBDD
        * */
        usuariosSinFiltrar: [
          {
            codi: 2131223,
            nom: "Xavi",
            ap1: "Doe",
            ap2: "Doe",
            rol: "Professor"
          },
          {
            codi: 213223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 3131223,
            nom: "Xavi",
            ap1: "Doe",
            ap2: "Doe",
            rol: "Professor"
          },
          {
            codi: 413223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 5131223,
            nom: "Xavi",
            ap1: "Doe",
            ap2: "Doe",
            rol: "Professor"
          },
          {
            codi: 613223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 7131223,
            nom: "Xavi",
            ap1: "Doe",
            ap2: "Doe",
            rol: "Professor"
          },
          {
            codi: 813223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 9131345223,
            nom: "Xavi",
            ap1: "Doe",
            ap2: "Doe",
            rol: "Professor"
          },
          {
            codi: 1013453223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 101353223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 105613223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 31013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 10135223,
            nom: "Miguel",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 10136223,
            nom: "Miguel",
            ap1: "Monteiro ",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 10913223,
            nom: "Miguel Claveri",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
        ],
        usuariosFiltrados: null
      };
    },
    methods: {
      rowclick: function (evt, row) {
        console.log(evt, row);
      },
      getSelectedString() {
        return this.usuariosSeleccionados.length === 0
          ? ""
          : `${this.usuariosSeleccionados.length} record${
            this.usuariosSeleccionados.length > 1 ? "s" : ""
          } selected of ${this.usuariosSinFiltrar.length}`;
      },
      filterUsuarios() {
        const textoFiltro = this.filtroDeUsuarios.toLowerCase();
        this.usuariosFiltrados = this.usuariosSinFiltrar.filter(user => {
          const nombreCompleto = user.nom + ' ' + user.ap1 + ' ' + user.ap2

          if (this.tipoUsuarioSeleccionado.toLowerCase() !== 'todos' && this.tipoUsuarioSeleccionado.toLowerCase() !== user.rol.toLowerCase()) return false
          return nombreCompleto.toLowerCase().includes(textoFiltro);

        })
      },
      async guardarListado() {
        const response = await this.$axiosCore.post('/private/usuarios/comedor/listado', this.usuariosSeleccionados)
        if (response.status === 200) {
          this.notify("Usuarios marcados correctamente")
          this.usuariosSeleccionados = [] // BORRAMOS LAS SELECCIONES
        } else {
          this.notify("Ha habido un error" + response.data)
        }

      },
      async seleccionarSemanaPasada() {
        /*
        * TODO: hacer peticion al back
        * */
        this.notify("Usuarios del mismo día de la semana pasada seleccionados")
      },
      async seleccionarDiaPasado() {
        /*
        * TODO: hacer peticion al back
        * */
        this.notify("Usuarios que ayer tambien estuvieron seleccionados")
      },
      notify(message) {
        this.$q.notify({
          message: message,
          color: 'secondary',
          position: 'bottom-left'
        })
      }
    }
  };
</script>
