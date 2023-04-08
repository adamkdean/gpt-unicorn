// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import dotenv from 'dotenv'
dotenv.config()

export default {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4',
    prompt: process.env.OPENAI_PROMPT || 'Draw a unicorn in SVG format. Dimensions: 500x500. Respond ONLY with a single SVG string. Do not respond with conversation or codeblocks.',
  },
  server: {
    port: process.env.PORT || 3000
  },
  storage: {
    path: process.env.STORAGE_PATH || '.data'
  }
}