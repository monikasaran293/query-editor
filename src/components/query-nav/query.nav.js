import { useContext } from "react"
import { QueryContext } from "../../pages/home"
import { getInitialQuery } from "../../pages/home.util"
import './query.nav.css'


const QueryNav = () => {
  const { query, setQuery, queries, setQueries } = useContext(QueryContext)

  const onAddQuery = () => {
    const newQuery = getInitialQuery()
    setQueries({ ...queries, [newQuery.id]: { ...newQuery } })
  }

  const onQueryClick = (selectQuery) => {
    setQuery(selectQuery)
  }

  return <div className="query-nav-wrapper">
    <div className="query-nav-header">
      <div>QUERIES</div>
      <button onClick={onAddQuery}>Add</button>
    </div>
    {
      Object.values(queries).map(que => {
        const { id, name } = que
        let className = 'query-name'
        if (id === query.id) className += ' selected-query'
        return <div
          key={id}
          className={className}
          onClick={() => onQueryClick(que)}>
          {name}
          <span className="closeIcon">&times;</span>
        </div>
      })
    }
  </div>
}

export default QueryNav