import { CheerioAPI } from "cheerio";

/**
 * Given the contents of a Wiktionary page as a {@link CheerioAPI} object,
 * returns the headword (the word that the page is for).
 *
 * @param $
 */
export function parseHeadword($: CheerioAPI): string {
  return $("#firstHeading").text();
}
