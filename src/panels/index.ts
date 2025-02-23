export class Panel {
  #type: "VERTICAL" | "HORIZONTAL";
  element: HTMLDivElement;
  #size: number;
  #node1: HTMLDivElement;
  #node2: HTMLDivElement;
  #reversed: boolean;
  #splitter: HTMLDivElement;

  constructor(type: "VERTICAL" | "HORIZONTAL", reversed = false, size = 250) {
    this.#type = type;
    this.#size = size;
    this.#reversed = reversed;
    this.element = document.createElement("div");
    this.#node1 = document.createElement("div");
    this.#node1.classList.add("panel");
    this.#splitter = document.createElement("div");

    this.#splitter.onmousedown = (e1) => {
      let abortController = new AbortController();
      document.body.addEventListener(
        "mouseup",
        () => {
          abortController.abort();
        },
        { signal: abortController.signal }
      );

      let startX = e1.clientX;
      let startY = e1.clientY;
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

    this.#node2 = document.createElement("div");
    this.#node2.classList.add("panel");
    this.element.appendChild(this.#node1);
    this.element.appendChild(this.#splitter);
    this.element.appendChild(this.#node2);
    this.updateAll();
  }

  setNode1Class(name: string) {
    this.#node1.classList.add(name);
  }

  setNode2Class(name: string) {
    this.#node2.classList.add(name);
  }

  appendPanelNode1(panel: Panel) {
    this.#node1.appendChild(panel.element);
  }

  appendPanelNode2(panel: Panel) {
    this.#node2.appendChild(panel.element);
  }

  appendBody() {
    document.body.appendChild(this.element);
  }

  updateAll() {
    this.element.classList.remove(...this.element.classList);
    this.#splitter.classList.remove(...this.#splitter.classList);

    if (this.#type === "VERTICAL") {
      this.element.classList.add("vertical-panel");
      this.#splitter.classList.add("vertical-panel-splitter");
    }

    if (this.#type === "HORIZONTAL") {
      this.element.classList.add("horizontal-panel");
      this.#splitter.classList.add("horizontal-panel-splitter");
    }

    this.#updateSize();
  }

  #updateSize() {
    if (this.#type === "VERTICAL") {
      if (this.#reversed) {
        this.#node2.style.maxHeight = "";
        this.#node2.style.maxWidth = this.#size + "px";
        this.#node2.style.minWidth = this.#size + "px";
      } else {
        this.#node1.style.maxHeight = "";
        this.#node1.style.maxWidth = this.#size + "px";
        this.#node1.style.minWidth = this.#size + "px";
      }
    }

    if (this.#type === "HORIZONTAL") {
      if (this.#reversed) {
      
       

        this.#node2.style.maxHeight = this.#size + "px";
        this.#node2.style.minHeight = this.#size + "px";
    
        this.#node2.style.maxWidth = "";
      } else {
      
      

        this.#node1.style.maxHeight = this.#size + "px";
        this.#node1.style.minHeight = this.#size + "px";
    
        this.#node1.style.maxWidth = "";
      }
    }
  }

  setSize(size: number) {
    this.#size = size;
  }
}
