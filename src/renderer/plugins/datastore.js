import path from 'path'

const fs = require("fs");
const storage = require('electron-json-storage');

export default storage

export function initial(callback) {

    let rootDir = path.join(path.resolve('.'), '/touch_music/')

    if( !fs.existsSync(rootDir) ) {

        fs.mkdir(rootDir, (e) => { e ? callback(false, 10, '创建目录失败!') : callback(true, 10, '已创建数据目录(1/2)') })

    }

    rootDir = path.join(rootDir, '/data')

    if( !fs.existsSync(rootDir) ) {

        fs.mkdir(rootDir, (e) => { e ? callback(false, 20, '创建目录失败!') : callback(true, 20, '已创建数据目录(2/2)') })

    }

    console.log( storage , rootDir )

    storage.setDataPath(rootDir)

    callback(true, 30, '正在加载数据文件...')

}

// import Datastore from 'nedb'
// import path from 'path'
//
// class DataStore {
//
//     constructor() {
//
//         this.init = (appPath) => {
//
//             this.system = new Datastore({
//
//                 autoload: true,
//                 filename: path.join(appPath, '/talextouchqq/system.db')
//
//             })
//
//             this.user = new Datastore({
//
//                 autoload: true,
//                 filename: path.join(appPath, '/talextouchqq/user.db')
//
//             })
//
//             this.main = new Datastore({
//
//                 autoload: true,
//                 filename: path.join(appPath, '/talextouchqq/main.db')
//
//             })
//
//         }
//
//         this.init(path.resolve('.'))
//
//     }
//
// }
//
// export default new DataStore()
