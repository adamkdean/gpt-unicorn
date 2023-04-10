// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import axios from 'axios'

export class BasicChatAPI {
  constructor(apiKey, model) {
    this.apiKey = apiKey
    this.endpoint = 'https://api.openai.com/v1/chat/completions'
    this.model = model || 'gpt-3.5-turbo'
  }

  async generateCompletion(messages, options = {}) {
    const requestBody = {
      model: this.model,
      messages,
      ...options
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    }

    try {
      const response = await axios.post(this.endpoint, requestBody, config)
      const choices = response.data.choices
      if (choices.length === 0) throw new Error('No response from OpenAI')
      if (choices.length > 1) throw new Error('More than one response from OpenAI')
      return {
        content: choices[0].message.content.trim(),
        model: response.data.model,
        tokens: response.data.usage.completion_tokens
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
