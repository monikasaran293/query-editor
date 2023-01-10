import { useContext, useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { QueryContext } from "../../context/query.context"

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './query.result.css'

const QueryResult = () => {
  const { queryData: { query } } = useContext(QueryContext)

  const rowData = useMemo(() => query.data, [query.data])

  const columnDefs = useMemo(() => {
    const row = rowData?.[0] || []
    return Object.keys(row)
      .map(key => {
        const columnDef = { field: key, resizable: true }
        if (Array.isArray(row[key])) {
          columnDef.valueFormatter = (d) => {
            return d?.value?.join(',') || d
          }
        } else if (typeof row[key] === 'object') {
          columnDef.valueFormatter = (d) => d?.value ? Object.values(d.value).join(',') : d
        }
        return columnDef
      })
  }, [rowData])

  return <div className="query-result-wrapper">
    <header className='query-result-header'>
      <div>{query.table.toUpperCase()}</div>
      {
        !!rowData.length &&
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(rowData))}`}
          download={`${query.table}.json`}>
          Export
        </a>
      }

    </header>
    <div className="ag-theme-alpine" style={{ height: '80%', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  </div>
}

export default QueryResult