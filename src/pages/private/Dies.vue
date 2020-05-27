<template>
  <q-page class="q-pa-xl">
    <div class="flex justify-between full-width">
      <div class="text-h4">
        Marcatges per dia
      </div>
      <div>
        <q-input placeholder="Data de marcatge" outlined v-model="diaSeleccionado" mask="##-##-####"
                 @click="()=> $refs.qDateProxy.show()">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date first-day-of-week="1" minimal mask="DD-MM-YYYY" v-model="diaSeleccionado" @input="() => {
                  $refs.qDateProxy.hide()
                  carregarDia()
                }"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="full-width full-height  flex-center text-center" v-if="diaSeleccionadoDataFiltered===null">
      <p>
        <img
          src="~assets/sad.svg"
          style="width:30vw;max-width:150px;"
        >
      </p>
      <p class="text-faded">
        No hi ha cap dia seleccionat o no té cap data rellevant
      </p>
    </div>
    <div class="full-width full-height  q-mt-md" v-if="diaSeleccionadoDataFiltered!==null">

      <q-list bordered class="rounded-borders col-12 ">
        <q-item-label header class="flex justify-between">
          <div>
            Usuaris marcats dia {{diaSeleccionado}}
          </div>

          <div class="row">
            <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':'q-mr-sm'" dense style="min-width: 200px" outlined
                      v-model="tipoUsuarioSeleccionado"
                      :options="optionsTipoUsuario" label="Tipo de usuario"
                      @input="filterUsuarios(filtroDeUsuarios)"
            />
            <q-select :class="$q.screen.lt.lg?'full-width q-mb-sm':'q-mr-sm'" dense style="min-width: 200px" outlined
                      v-model="grupoSeleccionado"
                      :options="grups" label="Grup"
                      @input="filterUsuarios"
                      :readonly="tipoUsuarioSeleccionado.toLowerCase()!=='alumne'"
            >

              <q-tooltip v-if="tipoUsuarioSeleccionado.toLowerCase()!=='alumne'">
                Nomes funciona si selecciones els alumnes
              </q-tooltip>

            </q-select>
            <q-input :class="$q.screen.lt.lg?'full-width q-mb-sm':''" outlined dense debounce="300"
                     v-model="filtroDeUsuarios" placeholder="Cercar"
                     @input="filterUsuarios">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
        </q-item-label>
        <q-item v-for="usuari in diaSeleccionadoDataFiltered" :key="usuari.codi">
          <q-item-section avatar>
            <q-avatar>
              <q-img src="ewc" placeholder-src="https://cdn.quasar.dev/img/avatar.png"
                     spinner-color="primary"
                     ratio="1"
                     alt="Imatge usuari"/>
            </q-avatar>
          </q-item-section>

          <q-item-section class="col-2 ">
            <q-item-label class="text-weight-mediumn">
              {{usuari.nombre}} {{usuari.apellidos}}
            </q-item-label>
          </q-item-section>


          <q-item-section class="justify-start overflow-auto">
            <div class="row">
              <div class="text-weight-bold">Marcat per:&nbsp;</div>
              <div>
                {{usuari.marcador.nombre}}
              </div>
              <q-tooltip>
                {{usuari.marcador.email}}
              </q-tooltip>
            </div>
          </q-item-section>

          <q-item-section class="content-end q-pr-xl">
            {{usuari.tipo}}
          </q-item-section>
          <q-item-section class="">
            {{usuari.grup}}
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                flat
                size="13px"
                color="primary"
                icon="fas fa-plus" dense round
                :to="'alumne/'+usuari.codi"
                v-if="usuari.tipo.toLowerCase()==='alumne'"
              />
            </div>
          </q-item-section>
        </q-item>

      </q-list>
    </div>


  </q-page>
</template>
<script>
  import moment from 'moment'

  export default {
    async created() {
      const responseGrups = await this.$axiosCore.get("/private/grupos");
      this.grups = responseGrups.data.map(grup => {
        return grup.curs.descripcio + "-" + grup.nom;
      });
      this.grups.unshift("Tots");
    },
    data() {
      return {
        diaSeleccionado: '',
        diaSeleccionadoDataFiltered: null,
        diaSeleccionadoData: null,
        grups: [],
        tipoUsuarioSeleccionado: 'Todos',
        optionsTipoUsuario: ['Todos', 'Professor', 'Alumne'],
        filtroDeUsuarios: '',
        grupoSeleccionado: 'Tots'

      }
    },
    methods: {
      async carregarDia() {
        const response = await this.$axiosCore.get(`/private/comedor/marcajes/${this.formatDateToCoreFormat(this.diaSeleccionado)}`)
        if (response.status === 200) {
          if (response.data.alumnes && response.data.professors) {
            if (response.data.alumnes.length > 0 || response.data.professors.length > 0) {
              this.diaSeleccionadoData = []
              response.data.alumnes.forEach(entidad => {
                const alumne = entidad.alumne;
                const user = {
                  nombre: '',
                  apellidos: '',
                  codi: '',
                  grup: '',
                  marcador: {
                    nombre: '',
                    email: ''
                  },
                  tipo: 'Alumne'
                }
                user.nombre = alumne.nom
                user.apellidos = alumne.ap1 + ' ' + alumne.ap2
                user.codi = alumne.codi

                user.marcador.nombre = entidad.usuariApp.nombre + ' ' + entidad.usuariApp.apellido1 + ' ' + entidad.usuariApp.apellido2
                user.marcador.email = entidad.usuariApp.email


                let grupo;
                if (alumne.grup != null && typeof alumne.grup === 'object') {
                  grupo = alumne.grup.curs.descripcio + "-" + alumne.grup.nom
                } else if (alumne.grup != null && typeof alumne.grup != 'object') {
                  grupo = alumne.grup;
                }
                user.grup = grupo
                this.diaSeleccionadoData.push(user)
              })
              response.data.professors.forEach(entidad => {
                const profe = entidad.professor;
                const user = {
                  nombre: '',
                  apellidos: '',
                  codi: '',
                  grup: '',
                  marcador: {
                    nombre: '',
                    email: ''
                  },
                  tipo: 'Professor'
                }
                user.nombre = profe.nom
                user.apellidos = profe.ap1 + ' ' + profe.ap2
                user.codi = profe.codi

                user.marcador.nombre = entidad.usuariApp.nombre + ' ' + entidad.usuariApp.apellido1 + ' ' + entidad.usuariApp.apellido2
                user.marcador.email = entidad.usuariApp.email

                this.diaSeleccionadoData.push(user)
              })

              this.diaSeleccionadoDataFiltered = this.orderUsuaris(this.diaSeleccionadoData)
            } else {
              this.diaSeleccionadoData = null
              this.diaSeleccionadoDataFiltered = null
            }
          }
        }
      },
      formatDateToCoreFormat(date) {
        return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
      },
      filterUsuarios() {
        const textoFiltro = this.filtroDeUsuarios.toLowerCase();
        this.diaSeleccionadoDataFiltered = this.diaSeleccionadoData.filter(user => {
          const nombreCompleto = user.nombre + ' ' + user.apellidos

          if (this.tipoUsuarioSeleccionado.toLowerCase() !== 'todos' && this.tipoUsuarioSeleccionado.toLowerCase() !== user.tipo.toLowerCase()) return false

          if (this.tipoUsuarioSeleccionado.toLowerCase() === 'alumne') {
            if (this.grupoSeleccionado.toLowerCase() !== 'tots' && this.grupoSeleccionado.toLowerCase() !== user.grup.toLowerCase()) return false

            return nombreCompleto.toLowerCase().includes(textoFiltro);
          } else {
            return nombreCompleto.toLowerCase().includes(textoFiltro);
          }
        })
      },
      orderUsuaris(users) {
        return users.sort((a, b) => a.nombre.localeCompare(b.nombre, 'ca', {sensitivity: 'base'}))
      }
    }
    ,

  }
</script>
