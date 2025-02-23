import { PanelLayout } from "./panels";
import "./style.css";

const rootNode = new PanelLayout("HORIZONTAL", false, 100, 100);
rootNode.appendBody();
rootNode.addPanel1Class("red");

const leftAndContent = new PanelLayout("VERTICAL");
leftAndContent.addPanel1Class("purple");
rootNode.appendPanel2(leftAndContent);

const contentAndRight = new PanelLayout("VERTICAL", true);
contentAndRight.addPanel1Class("yellow");
contentAndRight.appPanel2Class("orange");
leftAndContent.appendPanel2(contentAndRight);
