import Push from 'push.js'

export default {
  install(Vue, options) {
    Vue.push = Push
    window.push = Push
    window.intervalCheck = null
    window.notify = (options) => {
      Push.create(options.title, {
        body: options.body,
        icon: '/img/icons/android-chrome-192x192.png',
        link: '/#/list',
        timeout: 4000,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      })
    }
    window.checkTaskInterval = () => {
      // const date = new Date()
      // if (date.getHours() === 8 && date.getMinutes() === 0) {
      //   window.db.fetch('tasks').then(data => {
      //     data.forEach(task => {
      //       const dayRemaining = window.moment(task.deadline).diff(window.moment(), 'days')
      //       if (dayRemaining < 3) {
      //         window.notify({
      //           title: 'Notifikasi Deadline',
      //           body: dayRemaining >= 0
      //             ? `Deadline task '${task.name}' ${dayRemaining === 0 ? 'adalah hari ini!' : dayRemaining === 1 ? 'adalah besok!' : `tersisa ${dayRemaining} lagi!`} Silahkan kerjakan.`
      //             : `Deadline task '${task.name} sudah lewat!'`
      //         })
      //       }
      //     })
      //   })
      // }
      window.db.fetch('tasks').then(data => {
        data.forEach(task => {
          const dayRemaining = window.moment(task.deadline).diff(window.moment(), 'days')
          if (dayRemaining < 3) {
            window.notify({
              title: 'Test notifikasi',
              body: 'Test ajahhh'
            })
          }
        })
      })
    }
  }
}
