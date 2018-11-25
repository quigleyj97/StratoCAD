import { DocumentModel } from "./model";
import { DocumentWidget } from "./widget";
import { TextModel } from "./models/text";
import { JSONValue } from "@phosphor/coreutils";

/**
 * A centralized registry of document models and their widgets
 */
export class DocumentRegistry {
    private modelRegistry = new Map<string, any>(); // TODO: typing
    private widgetRegistry = new Map<string, typeof DocumentWidget>();

    public createModel(data: JSONValue, modelType: string): DocumentModel<unknown> {
        let model: DocumentModel<unknown>;
        if (!this.modelRegistry.has(modelType)) {
            model = new TextModel({});
        } else {
            const ctor = this.modelRegistry.get(modelType)!;
            model = new ctor({});
        }
        model.loadFromModel(data);
        model.setClean();
        return model;
    }

    public createWidget<T extends DocumentModel<unknown>>(model: T, widgetType: string) {
        let widget: DocumentWidget<T>;
        if (!this.modelRegistry.has(widgetType)) {
            widget = new DocumentWidget({ model });
        } else {
            const ctor = this.widgetRegistry.get(widgetType)!;
            widget = new ctor({ model });
        }
        const updateWidget = () => {
            widget.update();
        }
        model.onUpdate.connect(updateWidget);
        widget.disposed.connect(() => model.onUpdate.disconnect(updateWidget));
        return widget;
    }
}
