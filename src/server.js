// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import express from 'express'
import path from 'path'
import { Generator } from './lib/generator.js'
import { LocalStorage } from './lib/storage.js'
import config from './config.js'

const storage = new LocalStorage('main', config.storage.path)
const generator = new Generator(config, storage)

const app = express()
app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views'))
app.use(express.static(path.join(path.resolve(), 'src', 'public')))

app.get('/', async (req, res) => {
  const images = await getRecentImages()
  const today = generator.generateDateKey()
  const todayImage = images[today]
  const previousImages = Object.entries(images)
    .filter(([date]) => date !== today)
    .map(([date, value]) => ({ date, ...value }))
    .reverse()

  res.render('index', { images: { today: todayImage, previous: previousImages } })
})

async function getRecentImages() {
  const entries = await storage.all()
  const images = {}

  for (const key in entries) {
    if (entries.hasOwnProperty(key)) {
      const image = JSON.parse(entries[key])
      images[key] = image
    }
  }

  return images
}

app.listen(config.server.port, async () => {
  console.log(`Server listening on port ${config.server.port}`)
  await generator.initialize()
})