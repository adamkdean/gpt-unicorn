// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import dotenv from 'dotenv'
dotenv.config()

export default {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4o'
  },
  server: {
    port: process.env.HTTP_PORT || 3000
  },
  storage: {
    path: process.env.STORAGE_PATH || '.data'
  }
}
