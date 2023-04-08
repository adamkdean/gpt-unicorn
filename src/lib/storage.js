// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import leveldown from 'leveldown'
import levelup from 'levelup'
import mkdirp from 'mkdirp'

export class LocalStorage {
  constructor(name, path) {
    this.name = name
    this.db = this.initializeDatabase(name, path)
  }

  initializeDatabase(name, path) {
    if (path) mkdirp.sync(path)
    return levelup(leveldown(`${path || '.'}/${name}.db`))
  }

  async print() {
    return new Promise((resolve, reject) => {
      let keys = 0, bytes = 0
      this.db.createReadStream()
        .on('data', (data) => {
          keys += 1
          bytes += data.value.length
          console.log(data.key.toString(), '->', data.value.length, 'bytes')
        })
        .on('error', (err) => console.error('stream error:', err))
        .on('end', () => {
          console.log('=')
          console.log(`= keys:  ${keys}`)
          console.log(`= bytes: ${bytes}`)
          console.log('=')
          resolve()
        })
    })
  }

  async all() {
    return new Promise((resolve, reject) => {
      const entries = {}
      this.db.createReadStream()
        .on('data', (data) => {
          entries[data.key.toString()] = data.value.toString()
        })
        .on('error', (err) => console.error('stream error:', err))
        .on('end', () => {
          resolve(entries)
        })
    })
  }

  async get(key, parseJson = false) {
    console.log(`storage (${this.name}) getting ${key}`)
    try {
      const value = await this.db.get(key)
      return parseJson ? JSON.parse(value) : value.toString()
    } catch (e) {
      if (e && e.notFound) return null
      console.error('get error:', e)
    }
  }

  async put(key, value) {
    console.log(`storage (${this.name}) putting ${typeof value === 'object' ? JSON.stringify(value) : value} into ${key}`)
    try {
      const data = typeof value === 'object' ? JSON.stringify(value) : value
      return await this.db.put(key, data)
    } catch (e) {
      if (e && e.notFound) return null
      console.error('put error:', e)
    }
  }

  async del(key) {
    console.log(`storage (${this.name}) deleting ${key}`)
    try {
      return await this.db.del(key)
    } catch (e) {
      if (e && e.notFound) return null
      console.error('del error:', e)
    }
  }
}
