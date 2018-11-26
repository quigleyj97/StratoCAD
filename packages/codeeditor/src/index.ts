import { IStratoPlugin } from "@stratocad/application";
import { IDocumentRegistry } from "@stratocad/documents";
import { CodeEditorWidget } from "./widget";

export { CodeEditorWidget };

export const CodeEditorPlugin: IStratoPlugin<void> = {
    id: "@stratocad/codeeditor",
    autoStart: true,
    requires: [IDocumentRegistry],
    activate: (app, registry: IDocumentRegistry) => {
        const { commands } = app;
        registry.registerWidget("editor", CodeEditorWidget);
    }
}