<template>
  <q-page class="q-pa-xl">

    <div class="text-h4 q-pl-sm">Passar llista</div>

    <div class="row">
      <div class="col-9  q-pa-sm">
        <q-table
          :data="usuariosFiltrados"
          :columns="columns"
          @row-click="rowclick"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          row-key="codi"
          :selected.sync="selected"
          rows-per-page-label="Usuarios por fila"
          :rows-per-page-options="[5,12,0]"
          separator="cell"
        >
          <template v-slot:top-right>
            <q-input outlined dense debounce="300" v-model="filtroDeUsuarios" placeholder="Search" @input="filterUsuarios">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </template>

          <template v-slot:top-left>
            <q-select dense style="min-width: 200px" outlined v-model="tipoUsuarioSeleccionado"
                      :options="optionsTipoUsuario" label="Tipo de usuario" @input="filterUsuarios(filtroDeUsuarios)"/>
          </template>
        </q-table>
      </div>
      <div class="col-3 bg-indigo q-pa-sm">
        <q-card class="fixed">
          <q-card-section>
            <div class="text-h6">
              Opciones comunes
            </div>
          </q-card-section>
          <q-separator inset="" />
          <q-card-section>

          </q-card-section>
        </q-card>
      </div>
    </div>


    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-btn  :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab" label="Guardar"
      color="green-10" text-color="white"/>

    </q-page-sticky>
  </q-page>
</template>


<script>
  export default {
    name: "PagesLlista",
    created() {
      this.usuariosFiltrados = this.usuariosSinFiltrar;
    },
    data() {
      return {
        fabPos: [ 18, 18 ],
        draggingFab: false,
        optionsTipoUsuario: ['Todos', 'Professor', 'Alumne'],
        tipoUsuarioSeleccionado: 'Todos',
        selected: [],
        filtroDeUsuarios: '',
        search: {
          nom: null,
          cognoms: {
            primer: null,
            segon: null
          }
        },
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
            codi: 9131223,
            nom: "Xavi",
            ap1: "Doe",
            ap2: "Doe",
            rol: "Professor"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          },
          {
            codi: 1013223,
            nom: "Roberto",
            ap1: "Caprio",
            ap2: "Doe",
            rol: "Alumne"
          }
        ],
        usuariosFiltrados: null
      };
    },
    methods: {
      rowclick: function (evt, row) {
        console.log(evt, row);
      },
      getSelectedString() {
        return this.selected.length === 0
          ? ""
          : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.usuariosSinFiltrar.length}`;
      },
      filterUsuarios() {
        const textoFiltro = this.filtroDeUsuarios.toLowerCase();
        this.usuariosFiltrados = this.usuariosSinFiltrar.filter(user => {

          if (this.tipoUsuarioSeleccionado.toLowerCase() !== 'todos' && this.tipoUsuarioSeleccionado.toLowerCase() !== user.rol.toLowerCase()) return false
          if (user.nom.toLowerCase().includes(textoFiltro)) return true;
          if (user.ap1.toLowerCase().includes(textoFiltro)) return true;
          if (user.ap2.toLowerCase().includes(textoFiltro)) return true;

          return false
        })
      },
      moveFab (ev) {
        this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

        this.fabPos = [
          this.fabPos[0] - ev.delta.x,
          this.fabPos[1] - ev.delta.y
        ]
      }
    }
  };
</script>
