// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import cron from 'node-cron'
import isSvg from 'is-svg'
import { BasicChatAPI } from './chatapi.js'

export class Generator {
  constructor(config, storage) {
    this.config = config
    this.storage = storage
    this.api = new BasicChatAPI(config.openai.apiKey, config.openai.model)
  }

  async initialize() {
    const key = this.generateDateKey()
    const image = await this.storage.get(key)
    if (!image) await this.generateImage()
    else console.log('Image already generated for today')
    cron.schedule('0 0 * * *', this.generateImage.bind(this))
  }

  async generateImage() {
    try {
      console.log('Generating and storing image...')
      const start = Date.now()
      const image = await this.fetchImage()
      const elapsed = Date.now() - start
      await this.storeImage(image.content, { elapsed, model: image.model, tokens: image.tokens })
      console.log('Generated and stored image successfully')
    } catch (error) {
      console.error('Error generating and storing image:', error)
    }
  }

  async fetchImage(context) {
    const messages = context || [
      { role: 'system', content: `You are a helpful assistant that generates SVG drawings. You respond only with SVG. You do not respond with text.` },
      { role: 'user', content: `Draw a unicorn in SVG format. Dimensions: 500x500. Respond ONLY with a single SVG string. Do not respond with conversation or codeblocks.` }
    ]

    const response = await this.api.generateCompletion(messages)

    if (!isSvg(response.content)) {
      console.error('Generated image is not valid SVG:', response.content)
      messages.push({ role: 'assistant', content: response.content })
      messages.push({ role: 'user', content: `The generated image is not valid SVG. Please try again. Only respond with SVG code. No text.` })
      return this.fetchImage(messages)
    }

    console.log('Generated image:', response.content)
    return response
  }

  async storeImage(image, metadata) {
    const key = this.generateDateKey()
    const value = JSON.stringify({ image, metadata })
    await this.storage.put(key, value)
  }

  generateDateKey(date = new Date()) {
    return `image-${date.toISOString().slice(0, 10)}`
  }
}
