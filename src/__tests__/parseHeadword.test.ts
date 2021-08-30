import { parseHeadword } from "../parseHeadword";
import { loadDocument } from "./__helpers__/loadDocument";

describe("parseHeadword", () => {
  it("returns the headword for the page", () => {
    const content = `
		<h1 id="firstHeading" class="firstHeading">evolution</h1>
		`;
    const document = loadDocument(content);

    const result = parseHeadword(document);

    expect(result).toEqual("evolution");
  });
});
