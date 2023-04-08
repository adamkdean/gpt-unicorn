// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import cron from 'node-cron'
import { BasicChatAPI } from './chatapi.js'

export class Generator {
  constructor(config, storage) {
    this.config = config
    this.storage = storage
    this.api = new BasicChatAPI(config.openai.apiKey, config.openai.model)
  }

  async initialize() {
    const key = this.getKey()
    const image = await this.storage.get(key)
    if (!image) await this.generateImage()
    else console.log('Image already generated for today')
    cron.schedule('0 0 * * *', this.generateImage.bind(this))
  }

  async generateImage() {
    try {
      console.log('Generating and storing image...')
      const image = await this.fetchImage()
      await this.storeImage(image)
      console.log('Generated and stored image successfully')
    } catch (error) {
      console.error('Error generating and storing image:', error)
    }
  }

  async fetchImage() {
    const prompt = this.config.openai.prompt
    const messages = [
      { role: 'system', content: `You are a helpful assistant that generates SVG drawings. You respond only with SVG. You do not respond with text.` },
      { role: 'user', content: prompt }
    ]

    const response = await this.api.generateCompletion(messages)
    return response.content.trim()
  }

  async storeImage(image) {
    const key = this.getKey()
    await this.storage.put(key, image)
  }

  getKey() {
    const date = new Date().toISOString().slice(0, 10)
    return `image-${date}`
  }
}
