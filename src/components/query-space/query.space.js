import { useContext, useEffect, useState } from "react"
import { QueryContext } from "../../context/query.context"
import { getInitialQuery } from "../../pages/home.util"
import './query.space.css'

const QuerySpace = () => {
  const { queryData: { query, queries }, setQueryData } = useContext(QueryContext)
  const [queryText, setQueryText] = useState(query.name)

  useEffect(() => {
    setQueryText(query?.name || '')
  }, [query.name])

  const onQueryRun = () => {
    fetch(`data/${query.table}.json`)
      .then((res) => res.json())
      .then((data) => {
        setQueryData({ query: { ...query, data } })
      })
  }

  const onQueryChange = (e) => {
    const updatedQuery = {
      ...getInitialQuery(),
      ...query,
      name: queryText
    }
    setQueryData({
      query: updatedQuery,
      queries: { ...queries, [updatedQuery.id]: { ...updatedQuery } }
    })
  }

  return <div className="query-space-wrapper">
    <header className="query-space-header">Input Query</header>
    <textarea
      className="query-space-text"
      value={queryText}
      rows={15}
      onBlur={onQueryChange}
      onChange={(e) => setQueryText(e.target.value)} />
    <div className="query-actions">
      <button
        disabled={!query?.name}
        onClick={onQueryRun}>
        Run
      </button>
    </div>
  </div>
}

export default QuerySpace