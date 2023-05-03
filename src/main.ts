import "./styles/style.scss"
import "./styles/style.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import { createApp } from 'vue'
import Pokedex from './Pokedex.vue'
import { createPinia } from "pinia"
createApp(Pokedex)
    .use(createPinia())
    .mount('#app')