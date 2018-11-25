import { IPlugin } from "@phosphor/application";
import { Token } from "@phosphor/coreutils";
import { StratoApp } from "../app/application";

export type IStratoPlugin<T> = IPlugin<StratoApp, T>;
