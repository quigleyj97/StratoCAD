import { StratoApp } from "./app/application";
import { MainMenuPlugin } from "./mainmenu";

export function registerPlugins(app: StratoApp) {
    app.registerPlugins([
        MainMenuPlugin
    ])
}