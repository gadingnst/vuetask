import Vue from 'vue'
import sql from 'alasql'

class Database {

  constructor(dbname){
    sql(`
      CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ${dbname};
      ATTACH LOCALSTORAGE DATABASE ${dbname};
      USE ${dbname};
    `)
  }

  createTable(name, fields) {
    let stringField = ''
    fields.forEach((field, i) => {
      stringField += (i === fields.length-1) ? `${field.name} ${field.options}` : `${field.name} ${field.options}, `
    })
    sql(`CREATE TABLE IF NOT EXISTS ${name} (${stringField})`)
    return this
  }

  static fetch(table){
    return sql.promise(`SELECT * FROM ${table}`)
  }

  static delete(table, id){
    return sql.promise(`DELETE FROM ${table} WHERE id = ?`, id)
  }
  
  static insert(table, rows, timeout = 850){
    // sengaja bikin promise
    return new Promise((res) => {
      let count = 0
      setTimeout(() => {
        for (const row of rows) {
          sql(`INSERT INTO ${table} VALUES ?`, [row])
          count++
        }
        return res(count)
      }, timeout)
    })
  }

}

Plugin.install = Vue => {
  Vue.db = Database
  window.db = Database
};

Vue.use(Plugin)

export default Plugin;