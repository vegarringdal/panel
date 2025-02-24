import { TemplateResult } from "lit-html";
const VERTICAL = "VERTICAL";
const HORIZONTAL = "HORIZONTAL";
export type PANEL_TYPE = typeof HORIZONTAL | typeof VERTICAL;

class PanelLayout {
  #type: PANEL_TYPE;
  root: HTMLDivElement;
  #size: number;
  #panel1El: HTMLDivElement;
  #panel2El: HTMLDivElement;
  #reversed: boolean;
  #splitterEl: HTMLDivElement;
  #minSize: number;
  #maxSize: number;

  constructor(
    type: PANEL_TYPE,
    reversed = false,
    size = 250,
    minSize = 150,
    maxSize = 450
  ) {
    this.#type = type;
    this.#minSize = minSize;
    this.#maxSize = maxSize;

    if (this.#minSize > this.#maxSize) {
      console.warn("minSize > maxSize");
      this.#minSize = this.#maxSize;
      // yes prob should have more checks for zero etc
    }

    this.#size = size;
    this.#reversed = reversed;

    this.root = document.createElement("div");

    this.#panel1El = document.createElement("div");
    this.#panel1El.classList.add("panel");

    this.#splitterEl = document.createElement("div"); // todo, needs a inner border, but needs to be wide for mouseevent

    this.#panel2El = document.createElement("div");
    this.#panel2El.classList.add("panel");

    this.root.appendChild(this.#panel1El);
    this.root.appendChild(this.#splitterEl);
    this.root.appendChild(this.#panel2El);

    this.#applyResizeEvents();
    this.#updateAll();
  }

  /**
   * adds css class
   * this is top if horizontal, or left if vertical
   * @param name
   */
  addPanel1Class(name: string | string[]) {
    if (Array.isArray(name)) {
      this.#panel1El.classList.remove(...name);
      this.#panel1El.classList.add(...name);
      return;
    }
    this.#panel1El.classList.remove(name);
    this.#panel1El.classList.add(name);
  }

  /**
   * adds css class
   * this is bottom if horizontal, or right if vertical
   * @param name
   */
  appPanel2Class(name: string | string[]) {
    if (Array.isArray(name)) {
      this.#panel2El.classList.remove(...name);
      this.#panel2El.classList.add(...name);
      return;
    }
    this.#panel2El.classList.remove(name);
    this.#panel2El.classList.add(name);
  }

  /**
   * this is top if horizontal, or left if vertical
   * @param name
   */
  appendPanel1(panel: PanelLayout) {
    this.#panel1El.appendChild(panel.root);
    return panel
  }

  /**
   * this is bottom if horizontal, or right if vertical
   * @param name
   */
  appendPanel2(panel: PanelLayout) {
    this.#panel2El.appendChild(panel.root);
    return panel
  }

  appendBody() {
    document.body.appendChild(this.root);
  }

  #applyResizeEvents() {
    this.#splitterEl.onmousedown = (e1) => {
      let abortController = new AbortController();

      document.body.addEventListener(
        "mouseup",
        () => {
          abortController.abort();
        },
        { signal: abortController.signal }
      );

      const startX = e1.clientX;
      const startY = e1.clientY;
      let deltaX = 0;
      let deltaY = 0;
      let oldSize = this.#size;

      document.body.addEventListener(
        "mousemove",
        (e2) => {
          requestAnimationFrame(() => {
            deltaX = startX - e2.clientX;
            deltaY = startY - e2.clientY;

            if (this.#type === "VERTICAL") {
              if (this.#reversed) {
                this.#size = oldSize + deltaX;
              } else {
                this.#size = oldSize - deltaX;
              }
            } else {
              if (this.#reversed) {
                this.#size = oldSize + deltaY;
              } else {
                this.#size = oldSize - deltaY;
              }
            }

            this.#updateSize();
          });
        },
        { signal: abortController.signal }
      );
    };
  }

  #updateAll() {
    this.root.classList.remove(...this.root.classList);
    this.#splitterEl.classList.remove(...this.#splitterEl.classList);

    if (this.#type === VERTICAL) {
      this.root.classList.add("vertical-panel");
      this.#splitterEl.classList.add("vertical-panel-splitter");
    }

    if (this.#type === HORIZONTAL) {
      this.root.classList.add("horizontal-panel");
      this.#splitterEl.classList.add("horizontal-panel-splitter");
    }

    this.#updateSize();
  }

  #updateSize() {
    if (this.#size < this.#minSize) {
      this.#size = this.#minSize;
    }

    if (this.#size > this.#maxSize) {
      this.#size = this.#maxSize;
    }

    const node = this.#reversed ? this.#panel2El : this.#panel1El;

    if (this.#type === VERTICAL) {
      node.style.maxWidth = this.#size + "px";
      node.style.minWidth = this.#size + "px";

      node.style.maxHeight = "";
    }

    if (this.#type === HORIZONTAL) {
      node.style.maxHeight = this.#size + "px";
      node.style.minHeight = this.#size + "px";

      node.style.maxWidth = "";
    }
  }

  setSize(size: number) {
    this.#size = size;
  }
}

/**
 * 
 * @param setSizeRight =false
 * @param size = 250
 * @param minSize = 100
 * @param maxSize = 350
 * @returns 
 */
export function newVerticalPanel(
  setSizeRight= false,
  size = 250,
  minSize = 100,
  maxSize = 350
) {
  return new PanelLayout(VERTICAL, setSizeRight, size, minSize, maxSize);
}

/**
 * 
 * @param setSizeRight = false
 * @param size = 250
 * @param minSize = 100
 * @param maxSize = 350
 * @returns 
 */
export function newHorizontalPanel(
  setSizeBottom = false,
  size = 250,
  minSize = 100,
  maxSize = 350
) {
  return new PanelLayout(HORIZONTAL, setSizeBottom, size, minSize, maxSize);
}

// Content needs to be tabbed
// for for each children we add a tab, children can be Content
// max tabs ?
// panel also allow dialog ?
export class PanelTab {
  #children: PanelContent[] = [];
}

// here we want the lit-html renderer
// lets let the panelTab hold the html node ?
// maybe this could just be a function, so we dont end up with state inside it
export interface PanelContent {
  label: () => string;
  render: () => TemplateResult<1>;
}
