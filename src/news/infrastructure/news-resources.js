/**
 * @typedef {Object} SourceResource
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [url]
 * @property {string} [category]
 * @property {string} [language]
 * @property {string} [country]
 */

/**
 * @typedef {Object} SourcesResponse
 * @property {string} status
 * @property {SourceResource[]} sources
 */

/**
 * @typedef {Object} ArticleResource
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [url]
 * @property {string} [urlToImage]
 * @property {string} [publishedAt]
 * @property {SourceResource} [source]
 */

/**
 * @typedef {Object} ArticlesResponse
 * @property {string} status
 * @property {ArticleResource[]} articles
 */

export {}