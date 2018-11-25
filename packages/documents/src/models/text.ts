import { DocumentModel } from "../model";

/**
 * A concrete model representing a block of text as a string
 */
export class TextModel extends DocumentModel<string> {
    public loadFromModel(model: string) {
        this.setContent(model);
    }

    public saveToModel() {
        return this.content;
    }

    public setText(newText: string) {
        this.setContent(newText);
    }
}