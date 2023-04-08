// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import config from './config.js'
import { BasicChatAPI } from './lib/chatapi.js'
import { LocalStorage } from './lib/storage.js'

const api = new BasicChatAPI(config.openai.apiKey)
const storage = new LocalStorage('main', config.storage.path)

// TODO: Draw the owl
