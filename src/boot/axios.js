import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios


const axiosBackend = axios.create({
    baseURL: process.env.BACKEND_URL
})

Vue.prototype.$axiosBackend = axiosBackend
