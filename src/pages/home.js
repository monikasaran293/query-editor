import QueryNav from "../components/query-nav/query.nav"
import QueryResult from "../components/query-result/query.result"
import QuerySpace from "../components/query-space/query.space"
import { QueryProvider } from "../context/query.context"

import './home.css'

const Home = () => {

  return <QueryProvider>
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
  </QueryProvider>
}

export default Home