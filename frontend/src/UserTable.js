import React from 'react';
import { useTable } from 'react-table';
import './UserTable.css';

function UserTable({ data, className = null }) {
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Created Date',
      accessor: 'created_date',
    },
    {
      Header: 'Deleted Date',
      accessor: obj => obj.deleted_date || "--",
    }
  ];
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table className={className}>
      <thead>
        {headerGroups.map(g => (
          <tr {...g.getHeaderGroupProps()}>
            {g.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((r, i) => {
          prepareRow(r);
          return (
            <tr {...r.getRowProps()}>
              {r.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTable;
