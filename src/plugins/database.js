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
    let stringField = ''
    fields.forEach((field, i) => {
      stringField += (i === fields.length-1) ? `${field.name} ${field.options}` : `${field.name} ${field.options}, `
    })
    AlaSQL.exec(`CREATE TABLE IF NOT EXISTS ${name} (${stringField})`)
    return this
  }

  static fetch(table){
    return AlaSQL.promise(`SELECT * FROM ${table}`)
  }

  static delete(table, id){
    return AlaSQL.promise(`DELETE FROM ${table} WHERE id = ?`, id)
  }
  
  static insert(table, tasks, timeout = 850){
    // sengaja bikin promise
    return new Promise(resolve => {
      let count = 0
      setTimeout(() => {
        for (const task of tasks) {
          AlaSQL.exec(`INSERT INTO ${table} VALUES ?`, [task])
          count++
        }
        return resolve(count)
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