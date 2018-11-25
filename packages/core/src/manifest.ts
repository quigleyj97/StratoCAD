import { StratoApp } from "@stratocad/application";
import { DocRegistryPlugin } from "@stratocad/documents";
import { MainMenuPlugin } from "@stratocad/mainmenu";

export function registerPlugins(app: StratoApp) {
    app.registerPlugins([
        DocRegistryPlugin,
        MainMenuPlugin
    ])
}