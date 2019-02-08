import Vue from 'vue'
import * as sql from 'alasql'

class Database {

  constructor(dbname){
    this.dbname = dbname
    sql(`
      CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ${this.dbname};
      ATTACH LOCALSTORAGE DATABASE ${this.dbname};
      USE ${this.dbname};
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
  
  static insert(table, tasks, timeout = 850){
    // sengaja bikin promise
    return new Promise((res) => {
      let count = 0
      setTimeout(() => {
        for (const task of tasks) {
          sql(`INSERT INTO ${table} VALUES ?`, [task])
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