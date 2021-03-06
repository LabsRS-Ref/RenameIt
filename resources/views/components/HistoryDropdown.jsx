/*
 * @Author: Rodrigo Soares 
 * @Date: 2017-12-25 19:52:04 
 * @Last Modified by: Rodrigo Soares
 * @Last Modified time: 2017-12-25 21:49:01
 */
import React from "react"
import mixpanel from "mixpanel-browser"
import { Dropdown, MenuItem } from "react-bootstrap"
import { mixpanelId } from "../../../src/lib/Constants"

class HistoryDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.onTargetSelect = this.onTargetSelect.bind(this)

    // Tracking
    mixpanel.init(mixpanelId)
  }

  onTargetSelect(target) {
    this.props.handleHistory(target)
  }

  onToggle() {
    mixpanel.track("history", {
      dropdown: `${this.props.dropdownId}`,
    })
  }

  render() {
    let menuItems
    if (this.props.menuData.length > 0) {
      menuItems = this.props.menuData.map((d, idx) => (
        <MenuItem key={`menu-${idx}`} eventKey={`${d}`} onSelect={() => this.onTargetSelect(d)}>
          {d}
        </MenuItem>
      ))
    } else {
      menuItems = (
        <MenuItem key="disabled-menu" disabled>
          Empty History
        </MenuItem>
      )
    }
    return (
      <Dropdown
        id={this.props.dropdownId}
        pullRight
        onToggle={() => this.onToggle(this)}
        dropup={this.props.dropup}
      >
        <Dropdown.Toggle bsStyle="primary" bsSize="xsmall">
          <span className="icon_history" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropMenu">
          <MenuItem header>Previously Used</MenuItem>
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default HistoryDropdown
