import {StringValidator} from "../../../shared/domain/model/string-validator.js";

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
}