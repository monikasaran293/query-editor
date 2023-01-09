import { useContext } from "react"
import { QueryContext } from "../../pages/home"
import './query.space.css'

const QuerySpace = () => {
  const { query, setQuery, queries, setQueries } = useContext(QueryContext)

  const onQueryRun = () => {
    fetch(`data/${query.table}.json`)
      .then((res) => res.json())
      .then((data) => {
        setQuery({ ...query, data })
      })
  }

  const onQueryChange = (e) => {
    const queryText = e.target.value
    const updatedQuery = { ...query, name: queryText }
    setQuery(updatedQuery)
    setQueries({ ...queries, [updatedQuery.id]: { ...updatedQuery } })
  }

  return <div className="query-space-wrapper">
    <header className="query-space-header">Input Query</header>
    <textarea
      className="query-space-text"
      defaultValue={query.name}
      rows={15}
      onBlur={onQueryChange} />
    <div className="query-actions">
      <button onClick={onQueryRun}>Run</button>
    </div>
  </div>
}

export default QuerySpace