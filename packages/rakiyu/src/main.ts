import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.styl";

import router from "./router";
import store from "./store";

import MyTable from "./components/Table/Table.vue";
import TableRow from "./components/Table/TableRow.vue";

import { registerComponent } from "./components/index";

const app = createApp(App);
app.use(router);
app.use(store);
app.component("MyTable", MyTable);
app.component("TableRow", TableRow);

app.use(registerComponent);

app.mount("#app");
