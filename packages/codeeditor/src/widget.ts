
import { UUID } from "@phosphor/coreutils";
import { editor } from "monaco-editor";
import { TextModel, DocumentWidget } from "@stratocad/documents";

export class CodeEditorWidget extends DocumentWidget<TextModel> {
    private editor: editor.IEditor;
    private editorModel: editor.ITextModel;
    public id: string = "x" + UUID.uuid4();

    constructor(args: DocumentWidget.IOptions<TextModel>) {
        super(args);
        this.editor = editor.create(this.node, {
            language: "javascript",
            value: this.model.content || "",
        });
        const model = this.editor.getModel();
        if (model == null) {
            throw Error("MonacoError: Model is null");
        }
        this.editorModel = model as editor.ITextModel;
        this.editorModel.onDidChangeContent(() => {
            this.model.setText(this.editorModel.getValue(), this.id);
        });
    }

    public dispose() {
        if (this.isDisposed) {
            return;
        }
        this.editor.dispose();
        this.editorModel.dispose();
        super.dispose();
    }

    public onDidUpdateContent() {
        this.editorModel.setValue(this.model.content || "");
    }

    protected onResize() {
        this.editor.layout()
    }
}