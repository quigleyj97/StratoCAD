import { Application } from "@phosphor/application";
import { StratoCAD } from "./shell";

export class StratoApp extends Application<StratoCAD> {
    constructor() {
        super({ shell: new StratoCAD() });
        this.commands.addCommand("file:open", {
            label: "Open...",
            execute: () => console.log("open")
        });
        this.commands.addCommand("file:close", {
            label: "Unopen...",
            execute: () => console.log("unopen")
        })
    }
}
