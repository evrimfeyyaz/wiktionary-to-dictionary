import cheerio, { CheerioAPI } from "cheerio";

/**
 * Given the contents of an HTML page, loads it as a {@link CheerioAPI} object.
 *
 * @param content
 */
export function loadDocument(content: string): CheerioAPI {
  return cheerio.load(content);
}
