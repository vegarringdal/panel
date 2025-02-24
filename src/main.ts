import { newHorizontalPanel, newVerticalPanel } from "./panels";
import "./style.css";

const rootNode = newHorizontalPanel(false, 100, 100);
rootNode.appendBody();

const leftAndContent = rootNode.appendPanel2(newVerticalPanel());
const contentAndRight = leftAndContent.appendPanel2(newVerticalPanel(true));


