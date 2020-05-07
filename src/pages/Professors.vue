<template>
  <q-page class="flex flex-center">
    <q-table title="Professors" :data="data" :columns="columns" @row-click="rowclick(evt, row)">
      <!--    <template slot="top-right" >
        <q-btn
          @click="$router.push('alumne')"
          icon="add_circle"
          size="14px"
          color="primary"
          label="Afegir"
        />
      </template>-->
    </q-table>
  </q-page>
</template>


<script>
export default {
  name: "PagesAlumne",
  data() {
    return {
      columns: [
        {
          name: "codi",
          required: true,
          label: "Codi",
          align: "rleft",
          field: row => row.codi,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "nom",
          required: true,
          label: "Nom",
          align: "right",
          field: row => row.nom,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "ap1",
          required: true,
          label: "Primer cognom",
          align: "center",
          field: row => row.ap1,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "ap2",
          required: true,
          label: "Segon cognom",
          align: "center",
          field: row => row.ap2,
          format: val => `${val}`,
          sortable: true
        }
      ],
      data: [
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        },
        {
          codi: 2131223,
          nom: "Xavi",
          ap1: "Doe",
          ap2: "Doe"
        }
      ]
    };
  },
  methods: {
    rowClick: function(evt, row) {
      console.log(evt, row);
    }
  }
};
</script>