import { StratoApp } from "@stratocad/application";
import { MainMenuPlugin } from "@stratocad/mainmenu";

export function registerPlugins(app: StratoApp) {
    app.registerPlugins([
        MainMenuPlugin
    ])
}