<template>
  <q-page class="q-pa-md">
    <div class="flex justify-between q-pa-sm">
      <div class="text-h4 ">Pasar llista</div>
      <q-btn unelevated color="primary" v-if="$q.screen.lt.lg" class="full-width" label="Seleccions comunes"
             icon="fas fa-angle-down">
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item clickable @click="seleccionarSemanaPasada">
              <q-item-section>Igual setmana pasada</q-item-section>
            </q-item>
            <q-item clickable @click="seleccionarDiaPasado">
              <q-item-section>Selecció igual que ahir</q-item-section>
            </q-item>

          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="row">
      <div class="col-lg-9 col-12  q-pa-sm">
        <q-table
        v-if="$q.screen.width>600"
          :data="usuariosFiltrados"
          :columns="columns"
          @row-click="rowclick"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          row-key="codi"
          :selected.sync="usuariosSeleccionados"
          rows-per-page-label="Usuarios por fila"
          :pagination.sync="myPagination"
          separator="cell"
        >
          <template v-slot:top class="bg-indigo">
            <div :class="$q.screen.gt.md?'full-width flex justify-between':'full-width'">
              <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                        v-model="tipoUsuarioSeleccionado"
                        :options="optionsTipoUsuario" label="Tipo de usuario"
                        @input="filterUsuarios(filtroDeUsuarios)"
                        :readonly="soloPuedeFicharAlumnos"
              >

                <q-tooltip v-if="soloPuedeFicharAlumnos">Nomes cuiners poden marcar altres usuaris que alumnes
                </q-tooltip>
              </q-select>

              <div class="row" >
                <q-input :class="$q.screen.lt.lg?'full-width q-mb-sm':'q-mr-sm'" outlined dense debounce="300"
                         v-model="filtroDeUsuarios" placeholder="Cercar"
                         @input="filterUsuarios">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
                <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                          v-model="grupoSeleccionado"
                          :options="grups" label="Grup"
                          :readonly="tipoUsuarioSeleccionado!=='Alumne'"
                          @input="filterUsuarios"/>
              </div>

            </div>
          </template>

        </q-table>
        <q-table
        v-else
          :data="usuariosFiltrados"
          :columns="columnsMobile"
          selection="multiple"
          @row-click="rowclick"
          :selected-rows-label="getSelectedString"
          row-key="codi"
          :selected.sync="usuariosSeleccionados"
          rows-per-page-label="Usuarios por fila"
          :pagination.sync="myPagination"
          separator="cell"
          grid
        >
          <template v-slot:top class="bg-indigo">
            <div :class="$q.screen.gt.md?'full-width flex justify-between':'full-width'">
              <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                        v-model="tipoUsuarioSeleccionado"
                        :options="optionsTipoUsuario" label="Tipo de usuario"
                        @input="filterUsuarios(filtroDeUsuarios)"
                        :readonly="soloPuedeFicharAlumnos"
              >

                <q-tooltip v-if="soloPuedeFicharAlumnos">Nomes cuiners poden marcar altres usuaris que alumnes
                </q-tooltip>
              </q-select>

              <div class="row">

                <q-input :class="$q.screen.lt.lg?'full-width q-mb-sm':'q-mr-sm'" outlined dense debounce="300"
                         v-model="filtroDeUsuarios" placeholder="Cercar"
                         @input="filterUsuarios">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
                <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':''" dense style="min-width: 200px" outlined
                          v-model="grupoSeleccionado"
                          :options="grups" label="Grup"
                          :readonly="tipoUsuarioSeleccionado!=='Alumne'"
                          @input="filterUsuarios"/>
              </div>

            </div>
          </template>

        </q-table>
      </div>
      <div class="col-3  q-pa-sm flex justify-center" v-if="$q.screen.gt.md">
        <q-card class="fixed">
          <q-card-section>
            <div class="text-h6">
              Seleccions comunes
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
          <q-card-section>
            <q-date
              v-model="date"
              minimal
              today-btn
              mask="DD-MM-YYYY"
              first-day-of-week="1"
              @click="seleccionarDia"
            />
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
 import moment from 'moment'
  export default {
    name: "PagesLlista",
    async created() {
      /*
      * TODO RECUPERAR AQUI TODOS LOS USUARIOS QUE NECESITEMOS
      * */


      /*
      * Cogemos alumnos
      * */

      this.date=moment(moment()._d).format('DD-MM-YYYY')
      const promise = []
      promise.push(this.$axiosCore.get('/private/alumne/comedor/listado'))
      promise.push(this.$axiosCore.get('/private/professor/comedor/listado'))

      const responses = await Promise.all(promise)

      if (responses[0].status === 200) {


        responses[0].data.forEach(alumno => {
          const newAlumno = {
            nom: alumno.nom,
            ap1: alumno.ap1,
            ap2: alumno.ap2,
            grup: "",
            codi: alumno.codi,
          }
          let grupo;
          if (alumno.grup != null && typeof alumno.grup === 'object') {
            grupo = alumno.grup.curs.descripcio + "-" + alumno.grup.nom
          } else if (alumno.grup != null && typeof alumno.grup != 'object') {
            grupo = alumno.grup;
          }
          newAlumno.rol = 'Alumne'
          newAlumno.grup = grupo;
          this.usuariosSinFiltrar.push(newAlumno)
        })
      }

      if (responses[1].status === 200) {
        responses[1].data.forEach(profe => {
          profe.rol = 'Professor'
          this.usuariosSinFiltrar.push(profe)
        });
      }

      this.usuariosSinFiltrar = this.orderUsuaris(this.usuariosSinFiltrar)
      this.usuariosFiltrados = this.usuariosSinFiltrar;

      const responseGrups = await this.$axiosCore.get("/private/grupos");
      this.grups = responseGrups.data.map(grup => {
        return grup.curs.descripcio + "-" + grup.nom;
      });
      this.grups.unshift("Tots");


      this.rolesLogued = JSON.parse(localStorage.getItem("rol"))

      let isCuiner = false;

      this.rolesLogued.forEach(rol => {
        if (rol === process.env.CUINER_ROL) {
          isCuiner = true;
        }
      })

      if (!isCuiner) {
        this.tipoUsuarioSeleccionado = 'Alumne'
        this.soloPuedeFicharAlumnos = true
        this.filterUsuarios(this.filtroDeUsuarios)
      }

    },
    data() {

      return {
        grups: [],
        fotos:false,
        grupoSeleccionado: "Tots",
        date: null,
        myPagination: {
          rowsPerPage: 11
        },
        rolesLogued: [],
        cuinerRol: process.env.CUINER_ROL,
        monitorRol: process.env.MONITOR_ROL,
        soloPuedeFicharAlumnos: false,
        fabPos: [18, 18],
        draggingFab: false,
        optionsTipoUsuario: ['Todos', 'Professor', 'Alumne'],
        tipoUsuarioSeleccionado: 'Todos',
        usuariosSeleccionados: [],
        filtroDeUsuarios: '',
        columnsMobile: [{
            name: "nom",
            required: true,
            label: "Nom",
            align: "center",
            field: row => row.nom+" "+row.ap1+" "+row.ap2,
            format: val => `${val}`,
            sortable: true
          },
          {
            name: "grup",
            required: false,
            label: "Grupo (Alumnos)",
            align: "center",
            field: row => row.grup,
            format: val => `${val}`,
            sortable: true
          }],
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
            label: "Cognom",
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
          },
          {
            name: "grup",
            required: false,
            label: "Grupo (Alumnos)",
            align: "left",
            field: row => row.grup,
            format: val => `${val}`,
            sortable: true
          }
        ],

        /*
        * TODO ESTOS USUARIOS HAN DE VENIR DE BBDD
        * */
        usuariosSinFiltrar: [],
        usuariosFiltrados: []
      };
    }
    ,
    methods: {
      rowclick: function (evt, row) {
        if(!this.usuariosSeleccionados.includes(row)){
          this.usuariosSeleccionados.push(row)
        }
        else{
          this.usuariosSeleccionados = this.usuariosSeleccionados.filter(val =>val!=row)
        }
      }
      ,

      orderUsuaris(users) {
        return users.sort((a, b) => a.nom.localeCompare(b.nom, 'ca', {sensitivity: 'base'}))
      }
      ,
      getSelectedString() {
        const addS = this.usuariosSeleccionados.length > 1 ? "s" : "";
        return this.usuariosSeleccionados.length === 0
          ? ""
          : `${this.usuariosSeleccionados.length} usuario${addS} seleccionado${addS} de ${this.usuariosSinFiltrar.length}`;
      },
      filterUsuarios() {
        const textoFiltro = this.filtroDeUsuarios.toLowerCase();
        this.usuariosFiltrados = this.usuariosSinFiltrar.filter(user => {
          const nombreCompleto = user.nom + ' ' + user.ap1 + ' ' + user.ap2

          if (this.tipoUsuarioSeleccionado.toLowerCase() !== 'todos' && this.tipoUsuarioSeleccionado.toLowerCase() !== user.rol.toLowerCase()) return false

          if (this.tipoUsuarioSeleccionado.toLowerCase() === 'alumne') {
            if (this.grupoSeleccionado.toLowerCase() !== 'tots' && this.grupoSeleccionado.toLowerCase() !== user.grup.toLowerCase()) return false

            return nombreCompleto.toLowerCase().includes(textoFiltro);
          } else {
            return nombreCompleto.toLowerCase().includes(textoFiltro);
          }
        })
      },
      async guardarListado() {
        let formattedString = moment(this.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        console.log(formattedString)
        const response = await this.$axiosCore.post('/private/usuarios/comedor/listado', {users:this.usuariosSeleccionados, fecha:formattedString})
        if (response.status === 200) {
          this.notifyPositive("Usuaris marcats correctament")
          this.usuariosSeleccionados = [] // BORRAMOS LAS SELECCIONES
        } else {
          this.notifyNegative("Hi ha hagut un error" + response.data)
        }
      }
      ,
      async seleccionarSemanaPasada() {
        const response = await this.$axiosCore.get("/private/comedor/comun/ultima/semana")
        if (response.status === 200) {
          this.extractAlumnesAndProfesSeleccionados(response.data)
          this.notifyPositive("Usuaris del mateix dia de la setmana pasada seleccionats")
        }
      }
      ,
      async seleccionarDiaPasado() {
        const response = await this.$axiosCore.get("/private/comedor/comun/ayer")
        if (response.status === 200) {
          this.extractAlumnesAndProfesSeleccionados(response.data)
          this.notifyPositive("Mateixos usuaris que ahir seleccionats")
        }
      },
      extractAlumnesAndProfesSeleccionados(data) {
        this.usuariosSeleccionados = []
        if (data.data.alumnes != null) {
          data.data.alumnes.forEach(alumne => {
            this.usuariosSeleccionados.push(alumne)
          })
        }
        if (data.data.professors != null) {
          data.data.professors.forEach(profe => {
            this.usuariosSeleccionados.push(profe)
          })
        }
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
      },
      async seleccionarDia() {
        let timeStamp = this.date;
        let formattedString = moment(timeStamp, 'DD-MM-YYYY').format('YYYY-MM-DD');
        console.log(formattedString)
        const response = await this.$axiosCore.get(`/private/comedor/comun/${formattedString}`)
        console.log(response)
        if (response.status === 200) {
          this.extractAlumnesAndProfesSeleccionados(response)
          this.notifyPositive("Seleccionat usuaris")
        }
      },
    },
  }
  ;
</script>
