import { CheerioAPI } from "cheerio";

/**
 * Given the contents of a Wiktionary page as a {@link CheerioAPI} object,
 * returns the related ("see also") headwords.
 *
 * @param $
 */
export function parseSeeAlso($: CheerioAPI): string[] {
  return $(".disambig-see-also > b, .disambig-see-also-2 > b")
    .toArray()
    .map((item) => $(item).text());
}
