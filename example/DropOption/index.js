import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { DropOption } from "../../dist/index";
import DropOption from "../../src/Dropdown/index";
import { Dropdown, Button, Icon, Menu } from "antd";


const labelStyle = {  };
const dropStyle = { "margin-left": "8px" };
const menuItems = [
  {
    id: 1,
    label: "Item 1",
    labelStyle: labelStyle,
    icon: "setting",
    items: [
      {
        id: 11,
        label: "Item 1.1",
        icon: "area-chart",
        labelStyle: labelStyle
      },
      {
        id: 12,
        label: "Item 1.2",
        icon: "pie-chart",
        labelStyle: labelStyle
      }
    ]
  },
  {
    id: 2,
    label: "Item 2",
    icon: "bar-chart",
    labelStyle: labelStyle
  },
  {
    id: 3,
    label: "Item 3",
    icon: "bar-chart",
    labelStyle: labelStyle
  },
  {
    id: 4,
    label: "Item 4",
    icon: "picture",
    labelStyle: labelStyle,
    items: [
      {
        id: 41,
        label: "Item 4.1",
        icon: "camera",
        labelStyle: labelStyle,
        items: [
          {
            id: 411,
            label: "Item 4.1.a",
            icon: "eye",
            link: "/item41/a",
            labelStyle: labelStyle
          },
          {
            id: 412,
            label: "Item 4.1.b",
            icon: "video-camera",
            link: "/item41/b",
            labelStyle: labelStyle
          }
        ]
      },
      {
        id: 42,
        label: "Item 4.2",
        icon: "message",
        link: "/item42",
        labelStyle: labelStyle
      },
      {
        id: 43,
        label: "Item 4.3",
        icon: "compass",
        link: "/item43",
        labelStyle: labelStyle
      }
    ]
  }
];

const clickTitle = e => {
  console.log(`value:`, e);
  // console.log(`item-t:`, e.item);
  // console.log(`key-t:`, e.key);
  // console.log(`selectedKeys -t:`, e.selectedKeys );
};
const menu = (
  <Menu onClick={clickTitle}>
    <Menu.Item key="1">
      <Icon type="user" />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      3rd item
    </Menu.Item>
  </Menu>
);
class Testcontainer extends Component {
  handleMenuClick = e => {
    console.log("e:", e);
  };
  render() {
    return (
      <div>
        <DropOption
          onMenuClick={e => this.clickTitle(e)}
          menuData={menuItems}
          dropdownContent={
            <Button style={dropStyle}>
              Button down
              <Icon type="down" />
            </Button>
          }
        />
        <DropOption
          onMenuClick={e => this.clickTitle(e)}
          menuData={menuItems}
          disabled
          dropdownContent={
            <Button style={dropStyle}>
              DropOption Button disabled <Icon type="down" />
            </Button>
          }
        />
        <DropOption
          trigger={["contextMenu"]}
          onMenuClick={e => this.clickTitle(e)}
          menuData={menuItems}
          dropdownContent={
            <Button style={dropStyle}>
              Right Click on Me <Icon type="down" />
            </Button>
          }
        />
        <DropOption
          trigger={["click"]}
          onMenuClick={e => this.clickTitle( e)}
          menuData={menuItems}
          dropdownContent={
            <Button style={dropStyle}>
              Click on Me <Icon type="down" />
            </Button>
          }
        />
        <DropOption
          onMenuClick={e => this.clickTitle(e)}
          menuData={menuItems}
          dropdownContent={
            <Button style={dropStyle}>
              hover Me <Icon type="down" />
            </Button>
          }
        />
        <DropOption.Button
          onMenuClick={e => this.clickTitle(e)}
          menuData={menuItems}
          style={dropStyle}
          dropdownContent={<span> bottomCenter </span>}
        />
        <Dropdown overlay={menu}>
          <Button style={dropStyle}>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

ReactDOM.render(<Testcontainer />, document.getElementById("root"));
