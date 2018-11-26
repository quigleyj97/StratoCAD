import { StratoApp } from "@stratocad/application";
import { DocRegistryPlugin } from "@stratocad/documents";
import { MainMenuPlugin } from "@stratocad/mainmenu";
import { CodeEditorPlugin } from "@stratocad/codeeditor";

export function registerPlugins(app: StratoApp) {
    app.registerPlugins([
        DocRegistryPlugin,
        MainMenuPlugin,
        CodeEditorPlugin
    ])
}