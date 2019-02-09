import Vue from 'vue'
import AlaSQL from 'alasql'
class Database {
  constructor(dbname){
    AlaSQL.exec(`
      CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ${dbname};
      ATTACH LOCALSTORAGE DATABASE ${dbname};
      USE ${dbname};
    `)
  }

  createTable(name, fields) {
    let strfields = '', i = 0
    for (let field in fields) {
      strfields += (i === Object.keys(fields).length-1) ? `${field} ${fields[field]}` : `${field} ${fields[field]}, `
      i++
    }
    AlaSQL.exec(`CREATE TABLE IF NOT EXISTS ${name} (${strfields})`)
    return this
  }

  static filter(table, field){
    const key = Object.keys(field)[0]
    return AlaSQL.promise(`SELECT * FROM ${table} WHERE ${key} = ?`, [field[key]])
  }

  static insert(table, rows, timeout = 850){
    return new Promise(resolve => {
      let count = 0
      setTimeout(() => {
        for (const row of rows) {
          AlaSQL.exec(`INSERT INTO ${table} VALUES ?`, [row])
          count++
        }
        resolve(count)
      }, timeout)
    })
  }

  static delete(table, clause){
    const key = Object.keys(clause)[0]
    return AlaSQL.promise(`DELETE FROM ${table} WHERE ${key} = ?`, clause[key])
  }

  static fetch(table){
    return AlaSQL.promise(`SELECT * FROM ${table}`)
  }

  static update(table, sets, clause){
    let strset = '', i = 0, key = Object.keys(clause)[0]
    let value = Object.values(sets)
    value.push(clause[key])
    for(let set in sets){
      strset += (i === Object.keys(sets).length-1) ? `${set} = ?` : `${set} = ?, `
    }
    return AlaSQL.promise(`UPDATE ${table} SET ${strset} WHERE ${key} = ?`, value)
  }

}

Plugin.install = Vue => {
  Vue.db = Database
  window.db = Database
};

Vue.use(Plugin)

export default Plugin;