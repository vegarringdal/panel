import { newHorizontalPanel, newVerticalPanel } from "./panels";
import "./style.css";

const rootNode = newHorizontalPanel(false, 100, 100);
rootNode.appendBody();
rootNode.addPanel1Class("red");

const leftAndContent = newVerticalPanel();
leftAndContent.addPanel1Class("purple");
rootNode.appendPanel2(leftAndContent);

const contentAndRight = newVerticalPanel(true);
contentAndRight.addPanel1Class("yellow");
contentAndRight.appPanel2Class("orange");
leftAndContent.appendPanel2(contentAndRight);
