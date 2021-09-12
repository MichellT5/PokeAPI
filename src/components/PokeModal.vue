<template>
    <div class="modal fade" :class="{show: pokemon}" tabindex="-1" ref="modal">
        <div class="modal-dialog modal-lg modal-fullscreen-md-down">
            <div class="modal-content" v-if="pokemon">
                <div class="modal-header">
                    <h5 class="modal-title">#{{ pokemon.id }} {{ pokemon.species.name }}</h5>
                    <button type="button" class="btn-close" @click="sendCloseModalSignal" aria-label="Close"></button>
                </div>
                <div class="modal-body pokemon-card">
                    <div class="top-info row">
                        <div class="col-12 col-md-auto mb-3 mb-md-0">
                            <div class="poke-img mx-auto">
                                <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
                            </div>
                        </div>
                        <div class="stats col-12 col-md-9">
                            <div class="mb-1">The base stats from <strong>{{ pokemon.species.name }}</strong> are the following:</div>
                            <ul>
                                <li v-for="item in pokemon.stats" :key="item.stat.name">{{ item.stat.name }}</li>
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
    methods: {
        sendCloseModalSignal() {
            this.modal.hide();
            this.$emit('closeModal');
            
        }
    },
    mounted() {
        this.modal = new window.bootstrap.Modal(this.$refs['modal']);
        this.modal.show();
    },
};
</script>