import {computed, ref, shallowRef} from "vue";
import {NewsApi} from "../infrastructure/news-api.js";
import {SourceAssembler} from "../infrastructure/source.assembler.js";

class NewsStore {
    #newsApi = new NewsApi();
    #sourceAssembler = new SourceAssembler();
    #sources = shallowRef([]);
    #currentSource = shallowRef(undefined);
    #errors = ref([]);
    #currentSourceId = computed(() => this.#currentSource.value?.id);

    get sources() {
        return this.#sources.value;
    }

    get errors() {
        return this.#errors.value;
    }

    get currentSource() {
        return this.#currentSource.value;
    }

    get currentSourceId() {
        return this.#currentSourceId.value;
    }

    setCurrentSource(source) {
        this.#currentSource.value = source;
    }

    loadSources() {
        if (this.#sources.value.length > 0) return;
        this.#errors.value = [];
        this.#newsApi.getSources().then(response => {
            const sources = this.#sourceAssembler.toEntitiesFromResponse(response);
            this.#sources.value = sources;
            if (sources.length > 0) this.setCurrentSource(sources[0]);
        }).catch(message => {
            this.#errors.value.push(message);
            this.#sources.value = [];
        });
    }
}

export const newsStore = new NewsStore();