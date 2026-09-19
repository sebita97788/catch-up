import {StringValidator} from "../../../shared/domain/model/string-validator.js";
import {Url} from "../../../shared/domain/model/url.js";

export class Source {
    #id;
    #name;
    #description;
    #url;
    #category;
    #language;
    #country;
    #urlToLogo;

    constructor({id = "", name = "", description = "", url = "", category = "", language = "", country = "", urlToLogo = ""}) {
        if (!StringValidator.isNotEmptyString(id)) throw new Error('Source id must be a non-empty string');
        if (!StringValidator.isNotEmptyString(name)) throw new Error('Source name must be a non-empty string');

        this.#id = id.trim();
        this.#name = name.trim();
        this.#description = description;
        this.#url = url instanceof Url ? url : new Url(url);
        this.#category = category;
        this.#language = language;
        this.#country = country;
        this.#urlToLogo = urlToLogo;
        Object.freeze(this);
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get url() {
        return this.#url;
    }

    get category() {
        return this.#category;
    }

    get language() {
        return this.#language;
    }

    get country() {
        return this.#country;
    }

    get urlToLogo() {
        return this.#urlToLogo;
    }
}