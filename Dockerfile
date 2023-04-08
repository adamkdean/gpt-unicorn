# Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
# Use of this source code is governed by the GPL-3.0
# license that can be found in the LICENSE file.

FROM node:lts

WORKDIR /www

COPY package*.json ./
RUN npm install --omit dev --no-optional

COPY src src

CMD ["npm", "start"]
