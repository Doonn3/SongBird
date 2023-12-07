import "./app/style/app.style.scss";
import birdsDataRu from "./entities/Birds/data/birdsDataRu";
import { DisplayCard, AudioControl, LayoutGrid } from "./shared/ui";

import { CatalogPage } from "./pages/Catalog";

const app = document.querySelector<HTMLDivElement>("#app");

app?.append(new CatalogPage().Render());
