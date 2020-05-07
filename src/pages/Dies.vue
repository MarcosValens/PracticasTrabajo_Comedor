<template>
  <div class="q-pa-md window-height window-width row justify-center items-center">
    <div class="q-gutter-md row items-start">

      <template>
        <div class="q-pa-md">
          <q-table
            title="Dies"
            dense
            :data="data"
            :columns="columns"
            row-key="name"
          >

            </q-table>
        </div>
      </template>

    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        name: 'data',
                        required: true,
                        label: 'Data',
                        align: 'center',
                        field: row => row.date,
                        sortable: true
                    },
                    { name: 'nombre alumnes', align: "center", label: 'Nombre alumnes', field: 'alumnes'},
                    { name: 'nombre profesors', align:"center", label: 'Nombre Professors', field: 'professors'},
                ],
                data: [
                    {
                        date: '01/01/2020',
                        alumnes: 100,
                        professors: 0,
                    },
                    {
                        date: '02/01/2020',
                        alumnes: 120,
                        professors: 2,
                    },
                    {
                        date: '03/01/2020',
                        alumnes: 35,
                        professors: 10,
                    },
                    {
                        date: '04/01/2020',
                        alumnes: 200,
                        professors: 8,
                    },
                ]
            }
        }
    }
</script>
