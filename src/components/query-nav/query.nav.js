import { useContext } from "react"
import { QueryContext } from "../../context/query.context"
import { getInitialQuery } from "../../pages/home.util"
import './query.nav.css'


const QueryNav = () => {
  const { queryData: { query, queries }, setQueryData } = useContext(QueryContext)

  const onAddQuery = () => {
    const newQuery = getInitialQuery()
    setQueryData({ queries: { ...queries, [newQuery.id]: { ...newQuery } } })
  }

  const onQueryRemove = (e, id) => {
    e.stopPropagation()
    const updatedQueries = { ...queries }
    delete updatedQueries[id]
    let updatedQuery = query
    if (id === query.id) {
      updatedQuery = updatedQueries.length ? Object.values(updatedQueries)[0] : {}
    }
    setQueryData({
      query: { ...updatedQuery },
      queries: { ...updatedQueries }
    })
  }

  const onQueryClick = (selectQuery) => {
    setQueryData({ query: selectQuery })
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
          <span
            onClick={(e) => onQueryRemove(e, id)}
            className="closeIcon">&times;
          </span>
        </div>
      })
    }
  </div>
}

export default QueryNav