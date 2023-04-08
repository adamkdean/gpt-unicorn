#!/bin/bash
# Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
# Use of this source code is governed by the GPL-3.0
# license that can be found in the LICENSE file.

CONTAINER_NAME="gpt-unicorn"
IMAGE_NAME="gpt-unicorn"
HOSTNAME="gpt-unicorn.adamkdean.co.uk"

# First, build the new image
docker build -t $IMAGE_NAME .

# Next, stop and remove the old image
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

# Finally, run the new image
docker run \
  --detach \
  --restart always \
  --name $CONTAINER_NAME \
  --network core-network \
  --expose 8000 \
  --env HTTP_PORT=8000 \
  --env OPENAI_API_KEY=$OPENAI_API_KEY \
  --env VIRTUAL_HOST=$HOSTNAME \
  --env LETSENCRYPT_HOST=$HOSTNAME \
  $IMAGE_NAME
