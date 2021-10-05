<template>
    <v-container>
        <h2 class="text-center text-primary">Notas</h2>
        <v-row>
            <v-col>
                <v-form
                @submit.prevent="addNote"
                v-if="!edit"
                ref="form"
                lazy-validation>
                    <v-container>
                        
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                v-model="note.name"
                                :rules="[v => !!v || 'Name is required']"
                                label="Nombre"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                v-model="note.description"
                                :rules="[v => !!v || 'Name is required']"
                                label="Descripción"
                                required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="9" sm="6" md="3">
                                <v-btn
                                color="primary"
                                class="w-100"
                                type="submit">
                                    Agregar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <!---  EDIT ---->
                <v-form
                @submit.prevent="updateNote"
                v-else
                ref="form"
                lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col>
                                <h2>Editar</h2>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                v-model="note.name"
                                :rules="[v => !!v || 'Name is required']"
                                label="Nombre"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                v-model="note.description"
                                :rules="[v => !!v || 'Name is required']"
                                label="Descripción"
                                required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col>
                                <v-btn
                                color="success"
                                class="mx-2"
                                type="submit">
                                    Confirmar
                                </v-btn>
                                <v-btn
                                color="error"
                                type="submit"
                                @click="closeEdit">
                                    Cancelar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
            <v-col 
            :class="`d-${message.visible}`"
            cols="12">
                <v-alert
                dense
                :type="'success'"
                >
                    {{ message.text }}
                </v-alert>
            </v-col>
        </v-row>
        <!---- TABLE----->
        <v-row>
            <v-col cols="12">
                <v-simple-table
                fixed-header
                height="300px"
                >
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            NOMBRE
                        </th>
                        <th class="text-left">
                            DESCRIPCIÓN
                        </th>
                        <th class="text-left">
                            OPCIONES
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(item, i) in notes" :key="i"
                    >
                        <td>{{item._id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <v-btn
                            color="error"
                            @click="removeNote(item._id)"
                            >
                                <v-icon>
                                    {{icons.mdiDelete}}
                                </v-icon>
                            </v-btn>
                            <v-btn
                            color="warning"
                            class="mx-2"
                            @click="openEdit(item)"
                            >
                                <v-icon>
                                    {{icons.mdiPencil}}
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
                </template>
                </v-simple-table>
            </v-col>
            <v-col>
                <v-pagination
                v-model="currentPage"
                :length="countPages"
                circle
                ></v-pagination>
            </v-col>
        </v-row>
    </v-container> 
</template>

<script>

import { mapState } from 'vuex'
import {
    mdiAccount,
    mdiPencil,
    mdiShareVariant,
    mdiDelete, 
  } from '@mdi/js'
export default {
    data: () =>{
        return {
            icons: {
                mdiAccount,
                mdiPencil,
                mdiShareVariant,
                mdiDelete,
            },
            notes: [],
            message:{ text: "", color: "", visible: 'none'},
            note:{
                name:'', description:'',
            },
            edit: false,
            
            totalNotes: 0,
            limit: 5,
            currentPage: 1,
        }
    },
    computed:{
        ...mapState(['token']),
        countPages: function(){
            return Math.ceil(this.totalNotes / this.limit)
        }
    },
    watch:{
        "$route.query.page":{
            immediate: true,
            handler(page) {
                page = parseInt(page) || 1
                console.log(page)
                this.pagination(page)
                this.currentPage = page
            }
        },
        currentPage: function(){
            this.pagination(this.currentPage)
        }

    },
    methods:{
        pagination: async function(page){
            let config = {
                headers:{
                    token: this.token
                }
            }
            let skip = (page - 1) * this.limit
            const res = await this.axios.get(`/notes?limit=${this.limit}&skip=${skip}`, config)
            this.notes = res.data.noteDB
            this.totalNotes = res.data.totalNotes
        },
        /*
        listarNotas: function(){
            let config = {
                headers:{
                    token: this.token
                }
            }
            this.axios.get('/notes', config).
                then(res =>{
                    console.log(res.data.noteDB)
                    this.notes = res.data.noteDB
                }).
                catch(e =>{
                    console.log(e.response)
                })
        },
        */
        addNote: async function(){
            let config = {
                headers:{
                    token: this.token
                }
            }
            if(this.$refs.form.validate()){
                try {
                    const res = await this.axios.post('/new-note', this.note, config)
                    this.notes.push(res.data)
                    this.reset()
                    this.message.text = 'Creación exitosa'
                    this.showAlert()
                } catch (error) {
                    console.log(error)
                }
            }
        },
        removeNote: async function(id){
            console.log(id)
            try {
                const res = await this.axios.delete(`/note/${id}`)
                const index = this.notes.findIndex(item => item._id == res.data._id)
                this.notes.splice(index, 1)
                this.message.text = 'Eliminación exitosa'
                this.showAlert()

            } catch (error) {
                console.log(error)
            }
        },
        updateNote: async function (){
            console.log(this.note)
            try {
                const res = await this.axios.put(`/note/${this.note._id}`, this.note)
                this.notes = this.notes.map(item => 
                    (item._id === res.data._id) ? res.data : item
                )
                this.closeEdit()
                this.message.text = 'Actualización exitosa'
                this.showAlert()
            } catch (error) {
                console.log(error)
            }
        },
        openEdit: function(item){
            this.note = {...item}
            this.edit = true
        },
        closeEdit: function(){
            this.reset()
            this.edit = false
        },
        reset: function(){
            this.note = {
                name:'', description:''  
            }
            this.$refs.form.resetValidation()
        },
        showAlert: function(){
            this.message.visible = 'block'
            setTimeout(()=>{
                this.message.visible = 'none'
            }, 2500)
        }
    },
    /*
    created(){
        this.listarNotas()
    }*/
}
</script>