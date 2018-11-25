import { IStratoPlugin } from "../interfaces/plugin";
import { MenuBar, Menu } from "@phosphor/widgets";

export const MainMenuPlugin: IStratoPlugin<void> = {
    id: "@stratocad/mainmenu",
    autoStart: true,
    activate: (app) => {
        const { commands, shell } = app;
        const menubar = new MenuBar();
        menubar.addClass("sc-MenuBar");
        const file = new Menu({
            commands: commands,
        });
        file.title.label = "File";
        file.addItem({
            command: "file:open",
        });
        file.addItem({
            type: "separator"
        });
        file.addItem({
            command: "file:close"
        })
        menubar.addMenu(file);
        shell.setTopWidget(menubar);
    }
}