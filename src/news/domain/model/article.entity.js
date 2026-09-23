import {Source} from "./source.entity.js";
import {StringValidator} from "../../../shared/domain/model/string-validator.js";
import {Url} from "../../../shared/domain/model/url.js";

const NO_IMAGE_URL = 'https://placehold.co/600x400?text=No+Image';

export class Article {
    #author;
    #title;
    #description;
    #url;
    #urlToImage;
    #source;
    #publishedAt;

    constructor({author = '', title = '', description = '', url = '', urlToImage = '', source = null, publishedAt = ''}) {
        if (!StringValidator.isNotEmptyString(title)) throw new Error('Article title must be a non-empty string');
        if (!(source instanceof Source)) throw new Error('Article must have a resolved Source entity');

        let dateTime;
        try {
            dateTime = publishedAt instanceof DateTime ? publishedAt : new DateTime(publishedAt);
        } catch (e) {
            throw new Error('Article publishedAt must be a valid date');
        }
        if (dateTime.isFuture()) throw new Error('Article publishedAt cannot be in the future');

        const resolvedUrl = url instanceof Url ? url : new Url(url);
        if (resolvedUrl.isEmpty()) throw new Error('Article url must be a valid, non-empty URL');

        this.#author = author;
        this.#title = title.trim();
        this.#description = description;
        this.#url = resolvedUrl;
        const resolvedImage = urlToImage instanceof Url ? urlToImage : new Url(urlToImage);
        this.#urlToImage = resolvedImage.isEmpty() ? new Url(NO_IMAGE_URL) : resolvedImage;
        this.#source = source;
        this.#publishedAt = dateTime;
    }
}