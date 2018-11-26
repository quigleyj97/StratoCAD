import { IStratoPlugin } from "@stratocad/application";
import { Token } from "@phosphor/coreutils";
import { DocumentModel } from "./model";
import { TextModel } from "./models/text";
import { DocumentRegistry } from "./registry";
import { DocumentWidget } from "./widget";

export const IDocumentRegistry = new Token<DocumentRegistry>("@stratocad/documents:docregistry")
export type IDocumentRegistry = DocumentRegistry;

export namespace DocRegistryCommands {
    export const Open = "docregistry:open";
}

export {
    DocumentModel,
    TextModel,
    DocumentRegistry,
    DocumentWidget
};

export const DocRegistryPlugin: IStratoPlugin<DocumentRegistry> = {
    id: "@stratocad/documents",
    autoStart: true,
    provides: IDocumentRegistry,
    activate: (app) => {
        const { commands, shell } = app;
        const registry = new DocumentRegistry();

        commands.addCommand(DocRegistryCommands.Open, {
            label: "Open...",
            execute: (args) => {
                const data = "Hello I am some text";
                const model = registry.createModel(data, "text");
                const widget = registry.createWidget(model, "editor");
                shell.addDockWidget(widget);
                widget.update();
            }
        });

        return registry;
    }
}