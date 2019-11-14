import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

// export default class MenuExampleSecondaryPointing extends Component {
function MenuBar() {
  // state = { activeItem: 'home' }
  const [activeItem, setActiveItem] = useState('');

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // render() {
  //   const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            // onClick={this.handleItemClick}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              // onClick={this.handleItemClick}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              // onClick={this.handleItemClick}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  // }
}

export default MenuBar;