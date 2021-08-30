import { loadDocument } from "./__helpers__/loadDocument";
import { parseSeeAlso } from "../parseSeeAlso";

describe("parseSeeAlso", () => {
  it('returns the "see also" item on the page when there is one item', () => {
    const content = `
    <div class="disambig-see-also"><i>See also:</i> <b class="Latn"><a href="/wiki/Book" title="Book">Book</a></b></div>
    `;
    const document = loadDocument(content);

    const result = parseSeeAlso(document);

    expect(result).toEqual(["Book"]);
  });

  it('returns the "see also" items on the page when there are two items', () => {
    const content = `
    <div class="disambig-see-also-2"><i>See also:</i> <b class="Latn"><a href="/wiki/Tame" title="Tame">Tame</a></b> <i>and</i> <b class="Latn"><a href="/wiki/tam%C3%AB" title="tamë">tamë</a></b></div>
    `;
    const document = loadDocument(content);

    const result = parseSeeAlso(document);

    expect(result).toEqual(["Tame", "tamë"]);
  });

  it('returns the "see also" items on the page when there are more than two items', () => {
    const content = `
    <div class="disambig-see-also"><i>See also:</i> <b class="Latn"><a href="/wiki/Evolution" title="Evolution">Evolution</a></b>, <b class="Latn"><a href="/wiki/%C3%A9volution" title="évolution">évolution</a></b><span class="serial-comma">,</span><i><span class="serial-and"> and</span></i> <b class="Latn"><a href="/wiki/e-volution" title="e-volution">e-volution</a></b></div>
    `;
    const document = loadDocument(content);

    const result = parseSeeAlso(document);

    expect(result).toEqual(["Evolution", "évolution", "e-volution"]);
  });

  it('parses the "see also" items for "and"', () => {
    const content = `
    <div class="disambig-see-also"><i>See also:</i> <b class="Latn"><a href="/wiki/And" title="And">And</a></b>, <b class="Latn"><a href="/wiki/AND" title="AND">AND</a></b>, <b class="Latn"><a href="/wiki/%C3%A5nd" title="ånd">ånd</a></b>, <b class="Latn"><a href="/wiki/-and" title="-and">-and</a></b>, <b class="Latn"><a href="/wiki/and-" title="and-">and-</a></b>, <b class="Latn"><a href="/wiki/-%C3%A2nd" title="-ând">-ând</a></b><span class="serial-comma">,</span><i><span class="serial-and"> and</span></i> <b class="Latn"><a href="/wiki/Appendix:Variations_of_%22and%22" title="Appendix:Variations of &quot;and&quot;">Appendix:Variations of "and"</a></b></div>
    `;
    const document = loadDocument(content);

    const result = parseSeeAlso(document);

    expect(result).toEqual([
      "And",
      "AND",
      "ånd",
      "-and",
      "and-",
      "-ând",
      'Appendix:Variations of "and"',
    ]);
  });

  it('parses the "see also" items for ","', () => {
    const content = `
    <div class="disambig-see-also-2"><i>See also:</i> <b><a href="/wiki/%E2%80%9A" title="‚">‚</a></b> <i>and</i> <b class="Arab"><a href="/wiki/%D9%AB" title="٫">٫</a></b>‎</div>
    `;
    const document = loadDocument(content);

    const result = parseSeeAlso(document);

    expect(result).toEqual(["‚", "٫"]);
  });
});
