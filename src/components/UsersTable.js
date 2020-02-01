import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn}
        from 'react-bootstrap-table'
import './Component.css'



function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    alert(`You just selected '${row['name']}'`)
  }
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  unselectable: [2],
  selected: [1],
  onSelect: onSelectRow,
  bgColor: 'gold'
};

class UsersTable extends Component {
  render() {
    return (
      <div className="usersTable">
      <label className="blockLabel">LAST ACTIVE USERS</label>
        <BootstrapTable data={this.props.data}
                        selectRow={selectRowProp}

        >
          <TableHeaderColumn isKey dataField='id'
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='name'
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='value'
          >
            Value
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default UsersTable