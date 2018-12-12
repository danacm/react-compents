import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown, Icon, Menu } from "antd";
import 'antd/dist/antd.css';

class DropOption extends Component {
  loopMenu = data =>
    data.map(item => {
      //let nav = null;
      if (item.items && item.items.length) {
        return (
          <Menu.SubMenu
            key={item.id}
            title={
              <span>
                <Icon type={item.icon} />{" "}
                <span style={item.labelStyle}> {item.label} </span>
              </span>
            }>
            {this.loopMenu(item.items)}
          </Menu.SubMenu>
        );
      } else {
        return <Menu.Item key={item.id}>{this.getMenuContent(item)}</Menu.Item>;
      }
      //return { nav };
    });
  getMenuContent = item => {
    if (item.link && item.icon) {
      return (
        <a href={item.link}>
          <Icon type={item.icon} />
          <span style={item.labelStyle}>{item.label}</span>
        </a>
      );
    } else if (item.link) {
      return (
        <a href={item.link}>
          <span style={item.labelStyle}>{item.label}</span>
        </a>
      );
    } else if (item.icon) {
      return (
        <span>
          <Icon type={item.icon} />
          <span style={item.labelStyle}>{item.label}</span>
        </span>
      );
    } else {
      return <span style={item.labelStyle}>{item.label}</span>;
    }
  };

  render() {
    const {
      onMenuClick,
      menuData,
      dropdownContent,
      style,
      ...dropdownProps
    } = this.props;
    return (
      <Dropdown
        {...dropdownProps}
        overlay={<Menu onClick={onMenuClick}>{this.loopMenu(menuData)}</Menu>}>
        {dropdownContent}
      </Dropdown>
    );
  }
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuData: PropTypes.array.isRequired,
  dropdownProps: PropTypes.object,
  dropdownContent: PropTypes.object.isRequired
};

export default DropOption;
