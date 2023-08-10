# GPT Unicorn

GPT Unicorn is a project that explores the image generation capabilities of OpenAI's GPT-4 model by generating a new unicorn image every day. The project aims to track the changes and progress of the model over time by analyzing the generated images.

[View the demo](https://gpt-unicorn.adamkdean.co.uk)

[Read the blog post](https://adamkdean.co.uk/posts/gpt-unicorn-a-daily-exploration-of-gpt-4s-image-generation-capabilities)

[See the discussion](https://news.ycombinator.com/item?id=35561747)

## Background

This project is inspired by the paper [Sparks of Artificial General Intelligence: Early experiments with GPT-4](https://arxiv.org/pdf/2303.12712.pdf) by Sébastien Bubeck, Varun Chandrasekaran, Ronen Eldan, Johannes Gehrke, Eric Horvitz, Ece Kamar, Peter Lee, Yin Tat Lee, Yuanzhi Li, Scott Lundberg, Harsha Nori, Hamid Palangi, Marco Tulio Ribeiro, and Yi Zhang. In the paper, the authors explore the capabilities of GPT-4, discussing its performance on tasks spanning various domains and tasks.

GPT Unicorn focuses on the image generation aspect of GPT-4, specifically its ability to create SVG images of unicorns. By generating a new image every day, we can assess the model's understanding of visual information and its ability to connect language and visual representation.

## How It Works

GPT Unicorn queries GPT-4 once per day to generate a new unicorn image in SVG format. The image generation process involves the following steps:

1. Query GPT-4 with the prompt "Draw a unicorn in SVG" etc (full prompt [in the source code](https://github.com/adamkdean/gpt-unicorn/blob/master/src/lib/generator.js#L40)).
2. Process the output to extract the SVG code.
3. Render the SVG code to produce the final image.

## Viewing the Images

To view the daily generated unicorn images and browse the archive of previous drawings, visit [gpt-unicorn.adamkdean.co.uk](https://gpt-unicorn.adamkdean.co.uk). Follow the project to witness GPT-4's progress and join the discussion on its capabilities.

## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to the project or have any suggestions for improvements.

## Credit

This README was written with help from GPT-4. Thanks GPT-4!

## License

```js
// Copyright (C) 2023 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.
```
