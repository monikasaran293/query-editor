import { createContext, useEffect, useMemo, useState } from "react"
import QueryNav from "../components/query-nav/query.nav"
import QueryResult from "../components/query-result/query.result"
import QuerySpace from "../components/query-space/query.space"
import { getInitialQuery } from "./home.util"
import './home.css'


export const QueryContext = createContext()

const Home = () => {
  const [query, setQuery] = useState(getInitialQuery())
  const [queries, setQueries] = useState({
    [query.id]: { ...query }
  })

  const queryContextData = useMemo(() => ({
    query, setQuery,
    queries, setQueries
  }), [query, queries])

  useEffect(() => {
    const nextQuery = getInitialQuery()
    setQueries({
      ...queries,
      [nextQuery.id]: nextQuery
    })
  }, [])

  return <QueryContext.Provider value={queryContextData}>
    <header className="query-header">Query Editor</header>
    <div className="query-app">
      <div className="query-nav">
        <QueryNav />
      </div>
      <div className="query-body">
        <QuerySpace />
        <QueryResult />
      </div>
    </div>
  </QueryContext.Provider>
}

export default Home