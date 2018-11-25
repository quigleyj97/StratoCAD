import "@phosphor/default-theme/style/index.css";
import "../style/style.less";

import { UUID } from "@phosphor/coreutils";
import { StratoApp } from "@stratocad/application";
import { registerPlugins } from "./manifest";

console.log("Hello, world!");

const root = document.createElement("div");
root.id = "x" + UUID.uuid4();

const app = new StratoApp();
registerPlugins(app);

app.start({
    hostID: root.id,
});
