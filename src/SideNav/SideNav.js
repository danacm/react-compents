/*
 * @Author: dana_chen
 * @Date:   2018-11-26 11:52:08
 * @Last Modified by: dana_chen@sina.cn
 * @Last Modified time: 2018-12-12 14:13:37
 */
import React, { Component } from "react";
import { Menu, Icon } from "antd";
import 'antd/dist/antd.css';
// components
export default class SideNav extends Component {
  loop = (data) =>
    data.map(item => {
      //let nav = null;
      if (item.items && item.items.length) {
        return (
          <Menu.SubMenu
            key={item.id}
            title={
              <span>
                <Icon type={item.icon} /> <span> {item.label} </span>
              </span>
            }>
            {this.loop(item.items)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.id}>
            <Icon type={item.icon} />
            <span>{item.label}</span>
          </Menu.Item>
        );
      }
      //return { nav };
    });

  render() {
    const { menuData, ...param } = this.props;
    return (
      <Menu
        {...param}
      >
        {this.loop(menuData)}
      </Menu>
    );
  }
}

