import {SourceAssembler} from "./source.assembler.js";
import {Article} from "../domain/model/article.entity.js";
import "./news-resources.js";

export class ArticleAssembler {
    #source;
    #sourceAssembler;

    constructor(source = null) {
        this.#source = source;
        this.#sourceAssembler = new SourceAssembler();
    }

    toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.data["status"]},  ${response.data["code"]}, ${response.data["message"]}`);
            return [];
        }
        const articlesResponse = response.data;
        return articlesResponse["articles"].map((article) => {
            try {
                return this.toEntityFromResource(article);
            } catch (error) {
                console.error('Validation error for article:', error.message, article);
                return null;
            }
        }).filter(article => article !== null);
    }

    toEntityFromResource(resource) {
        const resolvedSource = this.#source && (this.#source.id === resource.source?.id || this.#source.name === resource.source?.name)
            ? this.#source
            : this.#sourceAssembler.toEntityFromResource(resource.source || {id: 'unknown', name: 'Unknown Source'});
        return new Article({...resource, source: resolvedSource});
    }
}