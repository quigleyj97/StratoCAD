import { Signal, ISignal } from "@phosphor/signaling";
import { IDisposable } from "@phosphor/disposable";
import { JSONValue } from "@phosphor/coreutils";

/**
 * A model that provides the content of a document and manages changes to that
 * document. The content of a document should be treated as if it were immutable
 * (though due to language limitations, deep immutability cannot be guaranteed)
 * 
 * ### Type Variables
 * 
 *  - `_ModelType` - The type of this model's content. This type should not
 *    include the null type.
 * 
 * ### Notes
 * 
 * *TODO*: Sync actions against a centralized undo/redo stack
 */
export abstract class DocumentModel<_ModelType> implements IDisposable {
    private _onDirty = new Signal<this, void>(this);
    private _onUpdate = new Signal<this, void>(this);
    private _isDirty = false;
    private _isDisposed = false;
    private _content: _ModelType | null = null;
    
    constructor({}: DocumentModel.IOptions) { }

    /** A signal that emits once when the model diverges from what is persisted,
     * and does not emit again until the changes have been saved.
     */
    public get onDirty(): ISignal<this, void> { return this._onDirty; }
    /** A signal that emits whenever the content of the model changes. */
    public get onUpdate(): ISignal<this, void> { return this._onUpdate; }
    /** Whether changes to this document model have been persisted */
    public get isDirty() { return this._isDirty; }
    /** Whether this model has been disposed */
    public get isDisposed() { return this._isDisposed; }
    /** Return the content of this model */
    public get content(): Readonly<_ModelType> | null { return this._content; }

    public dispose() {
        if (this._isDisposed) {
            return;
        }
        this._content = null;
        this._isDisposed = true;
    }

    /** Signal to this model that the content is persisted */
    public setClean() {
        this._isDirty = false;
    }

    /** Return a JSON object that can be serialized safely */
    public abstract saveToModel(): JSONValue;

    /** Load from a JSON object, modifying this object in place. Must set the
     * content of this model using setContent.
     */
    public abstract loadFromModel(model: JSONValue): void;

    /** Set the content in it's entirety, triggering signals as appropriate.
     * 
     * Throws an error if the model is disposed.
     * 
     * ### Notes
     * 
     * This should not be called by model consumers. Instead, subclassers should
     * provide more appropriate methods that will update the model and call this
     * method.
    */
    protected setContent(newContent: _ModelType) {
        if (this._isDisposed) {
            throw Error("Model disposed");
        }
        this._content = newContent;
        if (!this._isDirty) {
            this._isDirty = true;
            this._onDirty.emit(void 0);
        }
        this._onUpdate.emit(void 0);
    }
}

export namespace DocumentModel {
    export interface IOptions {

    }
}