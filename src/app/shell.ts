import { Widget, DockPanel, PanelLayout } from "@phosphor/widgets";
import { IStratoCAD } from "../interfaces/shell";
import "../../style/style.less";

export class StratoCAD extends Widget implements IStratoCAD {
    public layout: PanelLayout;
    private dockPanel: DockPanel;
    private topWidget: Widget | null = null;
    private bottomWidget: Widget | null = null;

    constructor() {
        super();
        this.addClass(IStratoCAD.APPLICATION_CLASS);
        this.layout = new PanelLayout();
        this.dockPanel = new DockPanel();
        this.layout.addWidget(this.dockPanel);
    }

    public dispose() {
        if (this.isDisposed) {
            return;
        }
        this.dockPanel.dispose();
        this.topWidget ? this.topWidget.dispose() : null;
        this.bottomWidget ? this.bottomWidget.dispose() : null;
        super.dispose();
    }

    public setTopWidget(widget: Widget) {
        if (this.topWidget != null) {
            this.topWidget.dispose();
        }
        this.topWidget = widget;
        this.layout.insertWidget(0, widget);
        this.dockPanel.update();
    }

    public setBottomWidget(widget: Widget) {
        if (this.bottomWidget != null) {
            this.bottomWidget.dispose();
        }
        this.bottomWidget = widget;
        this.layout.insertWidget(2, widget);
    }

    public addDockWidget(widget: Widget, options?: DockPanel.IAddOptions) {
        this.dockPanel.addWidget(widget, options);
    }
}
