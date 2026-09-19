import {Source} from "../domain/model/source.entity.js";
import {Url} from "../../shared/domain/model/url.js";
import {LogoDevApi} from "../../shared/infrastructure/logo-dev-api.js";
import "./news-resources.js";

export class SourceAssembler {
    #logoApi;

    constructor() {
        this.#logoApi = new LogoDevApi();
    }

    toEntitiesFromResponse(response) {
        if (response.data.status !== "ok") {
            console.error(`${response.data["status"]},  ${response.data["code"]}, ${response.data["message"]}`);
            return [];
        }
        const sourcesResponse = response.data;
        return sourcesResponse.sources.map((source) => {
            try {
                return this.toEntityFromResource(source);
            } catch (error) {
                console.error('Validation error for source:', error.message, source);
                return null;
            }
        }).filter(source => source !== null);
    }

    toEntityFromResource(resource) {
        const url = resource.url instanceof Url ? resource.url : new Url(resource.url);
        const urlToLogo = !url.isEmpty() ? this.#logoApi.getUrlToLogo(url) : '';
        return new Source({...resource, url, urlToLogo});
    }
}