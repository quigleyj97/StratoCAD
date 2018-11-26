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

    public registerModel(modelType: string, modelCtor: any) {
        this.modelRegistry.set(modelType, modelCtor);
    }

    public registerWidget(widgetType: string, widgetCtor: any) {
        this.widgetRegistry.set(widgetType, widgetCtor);
    }

    public createModel(data: JSONValue, modelType: string): DocumentModel<unknown> {
        let model: DocumentModel<unknown>;
        if (!this.modelRegistry.has(modelType)) {
            console.warn("DocumentModel", modelType, "not found in registry");
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
        if (!this.widgetRegistry.has(widgetType)) {
            console.warn("DocumentWidget", widgetType, "not found in registry");
            widget = new DocumentWidget({ model });
        } else {
            const ctor = this.widgetRegistry.get(widgetType)!;
            widget = new ctor({ model });
        }
        const updateWidget = (_sender: any, parent: string) => {
            if (parent === widget.id) {
                return;
            }
            widget.onDidUpdateContent();
        }
        model.onUpdate.connect(updateWidget);
        widget.disposed.connect(() => model.onUpdate.disconnect(updateWidget));
        return widget;
    }
}
