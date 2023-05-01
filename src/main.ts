import "./styles/style.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"

import { createApp } from 'vue'
import Pokedex from './Pokedex.vue'

window.bootstrap = Bootstrap;
createApp(Pokedex).mount('#app')