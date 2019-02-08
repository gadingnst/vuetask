import Vue from 'vue'
import uuid from 'uuid/v4'
import * as alasql from 'alasql'

const
  dbname = 'vuetaskdb',
  table = 'tasks'

const database = {
  init(){
    alasql(`
      CREATE LOCALSTORAGE DATABASE IF NOT EXISTS ${dbname};
      ATTACH LOCALSTORAGE DATABASE ${dbname};
      USE ${dbname};
    `)
    alasql(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id STRING PRIMARY KEY, 
        name STRING
      )
    `)
  },
  fetch(){
    return alasql(`SELECT * FROM ${table}`)
  },
  delete(id){
    alasql(`DELETE FROM ${table} WHERE id = ?`, id)
  },
  insert(tasks){
    for (const task of tasks) {
      alasql(`INSERT INTO ${table} VALUES ?`, [{ 
        id: uuid(),
        name: task.name
      }])
    }
  },
}

Plugin.install = Vue => {
  Vue.db = database
  window.db = database
};

Vue.use(Plugin)

export default Plugin;