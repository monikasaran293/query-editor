import { createContext, useMemo, useReducer, useState } from "react";
import { getInitialQuery } from "../pages/home.util";

export const QueryContext = createContext()

export const QueryProvider = ({ children }) => {
  const initialQuery = getInitialQuery()
  const [queryData, setQueryData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      query: initialQuery,
      queries: { [initialQuery.id]: initialQuery }
    }
  )

  const queryContextData = useMemo(() => ({
    queryData, setQueryData
  }), [queryData])

  return <QueryContext.Provider value={queryContextData}>
    {children}
  </QueryContext.Provider>
}
