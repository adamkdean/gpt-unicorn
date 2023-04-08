// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

// https://arxiv.org/pdf/2303.12712.pdf
// https://www.youtube.com/watch?v=qbIk7-JPB2c

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
  console.log(images)
  const today = generator.getKey()
  const todayImage = images[today]
  console.log(todayImage)
  const previousImages = Object.entries(images)
    .filter(([date]) => date !== today)
    .map(([date, src]) => ({ date, src }))
    .reverse()

  res.render('index', { images: { today: todayImage, previous: previousImages } })
})

async function getRecentImages() {
  const entries = await storage.all()
  return entries
}

// async function getRecentImages(n = 10) {
//   const allEntries = await storage.all()
//   const images = Object.entries(allEntries)
//     .filter(([key, value]) => key.startsWith('image-'))
//     .map(([key, value]) => ({
//       date: key.slice(6), // key format is "image-YYYY-MM-DD"
//       content: value
//     }))
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, n)

//   return images
// }

app.listen(config.server.port, async () => {
  console.log(`Server listening on port ${config.server.port}`)
  await generator.initialize()
})