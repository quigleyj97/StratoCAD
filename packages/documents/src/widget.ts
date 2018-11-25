import { Widget } from "@phosphor/widgets";
import { DocumentModel } from "./model";

/** A widget that can render a given model
 * 
 * ### Notes
 * 
 * DocumentModels govern how data is managed, whereas DocumentWidgets govern how
 * it is shown and edited.
 * 
 * The DocumentManager will post an `update-request` message to this widget
 * whenever the model updates, so subclassers can use that to update their view.
 */
export class DocumentWidget<_Model extends DocumentModel<any>> extends Widget {
    protected readonly model: _Model;

    constructor({model}: DocumentWidget.IOptions<_Model>) {
        super();
        this.model = model;
    }

    protected onUpdateRequest() {
        console.log("Hello, world!");
        console.log(this.model.content);
        this.node.innerText = ""+this.model.content;
    }
}

export namespace DocumentWidget {
    export interface IOptions<_Model extends DocumentModel<any>> {
        model: _Model;
    }
}
