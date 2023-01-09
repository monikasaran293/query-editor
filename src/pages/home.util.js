import { uniqueId } from "lodash"
import { TABLES_AVAILABLE } from "../constants/table.constants";

export const getInitialQuery = () => {
  const table = getRandomTable()
  return {
    id: uniqueId(),
    name: `Select * from ${table}`,
    table,
    data: []
  }
}

export const getRandomTable = () => TABLES_AVAILABLE[Math.floor(Math.random() * TABLES_AVAILABLE.length)];
