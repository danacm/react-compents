# react-compents
react compents base on antd
### 1、导航菜单
#### 传入参数和antd一致，传入数据格式为：
```javascript
const menuItems = [{
  id: 1,
  label: 'Item 1',
  icon: 'setting',
  items: [{
    id: 11,
  label: 'Item 1.1',
    icon: 'area-chart',
    link: '/item11',
  }, {
    id: 12,
    label: 'Item 1.2',
    icon: 'pie-chart',
    link: '/item12',
  }, ],
},];
```
#### 使用：
```javascript
import { SideNav } from 'react-antd-compents';
const clickTitle = e => {
  console.log(`value:`, e);
};
<SideNav
          menuData={menuItems}
          mode="inline"
          theme="dark"
          style={{ width: '100%' }}
          onSelect={clickTitle}
        />
```
#### 具体示例见example/SideNav
 
### 2、下拉菜单
#### 传入数据格式为：
```javascript
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
  },];
```
  #### 使用：
```javascript
import { DropOption, } from 'react-antd-compents';
const clickTitle = e => {
  console.log(`value:`, e);
};
        <DropOption
          onMenuClick={e => this.clickTitle( e)}
          menuData={menuItems}
          dropdownContent={
            <Button style={dropStyle}>
              hover Me <Icon type="down" />
            </Button>
          }
                  <DropOption.Button
          onMenuClick={e => this.clickTitle(e)}
          menuData={menuItems}
          style={dropStyle}
          dropdownContent={<span> bottomCenter </span>}
        />
```
        
#### 具体示例见example/DropOption
