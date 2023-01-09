import { useContext, useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import './query.result.css'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { QueryContext } from '../../pages/home';

const QueryResult = () => {
  const { query } = useContext(QueryContext)
  const [queryResult, setQueryResult] = useState([])

  useEffect(() => {
    setQueryResult(query.data)
  }, [query])

  const columnDefs = useMemo(() => {
    const row = queryResult?.[0] || []
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
  }, [queryResult])

  return <div className="query-result-wrapper">
    <header className='query-result-header'>
      <div>{query.table.toUpperCase()}</div>
      {
        !!queryResult.length &&
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(queryResult))}`}
          download={`${query.table}.json`}>
          Export
        </a>
      }

    </header>
    <div className="ag-theme-alpine" style={{ height: '80%', width: '100%' }}>
      <AgGridReact
        rowData={queryResult}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  </div>
}

export default QueryResult