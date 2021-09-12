<template>
    <div class="modal fade" :class="{show: pokemon}" tabindex="-1" ref="modal">
        <div class="modal-dialog modal-lg modal-fullscreen-md-down">
            <div class="modal-content" v-if="pokemon">
                <div class="modal-header">
                    <h5 class="modal-title">Pokemon Info</h5>
                    <button type="button" class="btn-close" @click="sendCloseModalSignal" aria-label="Close"></button>
                </div>
                <div class="modal-body pokemon-card">
                    <div class="top-info row mb-3 justify-content-md-center">
                        <div class="col-12 col-md-auto mb-3 mb-md-0">
                            <div class="poke-img mx-auto">
                                <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-5">
                            <p>Name: <strong class="text-capitalize">{{ pokemon.name }}</strong></p>
                            <p>National Dex: <strong>#{{ pokemon.id }}</strong></p>
                            <p>Height: <strong>{{ pokemonHeight }} </strong></p>
                            <p>Weight: <strong>{{ pokemonWeight }} </strong></p>
                            <p>Types: <span class="type" :class="['type-' + item.type.name]" v-for="item in pokemon.types" :key="item.slot">{{ item.type.name }}</span></p>
                        </div>
                    </div>
                    <div class="bottom-info row">
                        <div class="abilities col-12 col-md-6">
                            <div class="mb-1">The abilities that <strong>{{ pokemon.species.name }}</strong> can have are:</div>
                            <ul>
                                <li v-for="item in pokemon.abilities" :key="item.ability.name">{{ item.ability.name.replace('-', ' ') }}</li>
                            </ul>
                        </div>
                        <div class="stats col-12 col-md-6">
                            <div class="mb-1">The base stats from <strong>{{ pokemon.species.name }}</strong> are the following:</div>
                            <ul>
                                <li class="text-capitalize" v-for="item in pokemon.stats" :key="item.slot">{{ item.base_stat }} - {{ item.stat.name.replace('-', ' ') }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="sendCloseModalSignal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PokeModal",
    emits: ['closeModal'],
    props: {
        pokemon: {
            type: Object,
            default: () => { return {}; }
        }
    },
    data() {
        return {
            modal: null,
        }
    },
    computed: {
        pokemonHeight() {
            let h = this.pokemon.height;
            return h < 10 ? h * 10 + ' cm' : h / 10.0 + 'm';
        },
        pokemonWeight() {
            let w = this.pokemon.weight;
            return w < 10 ? w * 100 + ' g' : w / 10.0 + 'kg';
        }
    },
    methods: {
        sendCloseModalSignal() {
            this.modal.hide();
            setTimeout(() => {
                this.$emit('closeModal');
            }, 1000);
            
        }
    },
    mounted() {
        this.modal = new window.bootstrap.Modal(this.$refs['modal'], {backdrop: 'static', keyboard: false});
        this.modal.show();
    },
};
</script>