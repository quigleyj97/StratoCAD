import { Widget, DockPanel } from "@phosphor/widgets";

export interface IStratoCAD {
    setTopWidget(widget: Widget): void;
    setBottomWidget(widget: Widget): void;
    addDockWidget(widget: Widget, options?: DockPanel.IAddOptions): void;
}

export namespace IStratoCAD {
    export const APPLICATION_CLASS = "sc-ApplicationShell";
}
