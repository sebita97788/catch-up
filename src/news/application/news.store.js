import {computed, ref, shallowRef} from "vue";
import {NewsApi} from "../infrastructure/news-api.js";
import {SourceAssembler} from "../infrastructure/source.assembler.js";
import {ArticleAssembler} from "../infrastructure/article.assembler.js";

class NewsStore {
    #newsApi = new NewsApi();
    #sourceAssembler = new SourceAssembler();
    #sources = shallowRef([]);
    #articles = shallowRef({});
    #currentSource = shallowRef(undefined);
    #errors = ref([]);
    #currentSourceId = computed(() => this.#currentSource.value?.id);

    #currentSourceArticles = computed(() => {
        const id = this.#currentSourceId.value;
        return id ? (this.#articles.value[id] ?? []) : [];
    });

    get sources() {
        return this.#sources.value;
    }

    get articles() {
        return this.#articles.value;
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

    get currentSourceArticles() {
        return this.#currentSourceArticles.value;
    }

    setCurrentSource(source) {
        this.#currentSource.value = source;
        this.loadArticlesForCurrentSource();
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

    loadArticlesForCurrentSource() {
        const source = this.#currentSource.value;
        if (!source) return;
        if (this.#articles.value[source.id]) return;
        this.#newsApi.getArticlesForSourceId(source.id).then(response => {
            const articles = new ArticleAssembler(source).toEntitiesFromResponse(response);
            this.#articles.value = {...this.#articles.value, [source.id]: articles};
        }).catch(message => {
            this.#errors.value.push(message);
        });
    }
}

export const newsStore = new NewsStore();