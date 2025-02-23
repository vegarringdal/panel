import { Panel } from "./panels";
import "./style.css";

const rootNode = new Panel("HORIZONTAL");
rootNode.appendBody();
rootNode.setNode1Class("red");

const leftAndContent = new Panel("VERTICAL");
leftAndContent.setNode1Class("purple");
rootNode.appendPanelNode2(leftAndContent);

const contentAndRight = new Panel("VERTICAL", true);
contentAndRight.setNode1Class("yellow");
contentAndRight.setNode2Class("orange");
leftAndContent.appendPanelNode2(contentAndRight);
