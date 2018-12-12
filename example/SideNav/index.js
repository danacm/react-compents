import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SideNav } from '../../dist/index';
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
}, {
  id: 2,
  label: 'Item 2',
  icon: 'bar-chart',
  link: '/item2',
}, {
  id: 3,
  label: 'Item 3',
  icon: 'bar-chart',
  link: '/item3',
}, {
  id: 4,
  label: 'Item 4',
  icon: 'picture',
  items: [{
    id: 41,
    label: 'Item 4.1',
    icon: 'camera',
    items: [{
      id: 411,
      label: 'Item 4.1.a',
      icon: 'eye',
      link: '/item41/a',
    }, {
      id: 412,
      label: 'Item 4.1.b',
      icon: 'video-camera',
      link: '/item41/b',
    }, ],
  }, {
    id: 42,
    label: 'Item 4.2',
    icon: 'message',
    link: '/item42',
  }, {
    id: 43,
    label: 'Item 4.3',
    icon: 'compass',
    link: '/item43',
  }, ],
}, ];

const clickTitle = (e) => {
  console.log(`value:`, e);
  // console.log(`item-t:`, e.item);
  // console.log(`key-t:`, e.key);
  // console.log(`selectedKeys -t:`, e.selectedKeys );
 };
class Testcontainer extends Component {
  render() {
    return (
      <div style={{ maxWidth: '13.75rem', padding: 0 }}>
        <SideNav
          menuData={menuItems}
          mode="inline"
          theme="dark"
          style={{ width: '100%' }}
          onSelect={clickTitle}
        />
      </div>
    );
  }
}

ReactDOM.render(<Testcontainer />, document.getElementById('root'));
