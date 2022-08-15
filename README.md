# convert-to-base64

A tool to convert an image to Base64 data URL, which can be embedded in HTML or SVG.

## How to use

1. Obtain the URL from your image, clicking the **Convert image** button
2. Copy it, pressing **Ctrl+A** (or **Command + A** on MacOS)
2. Embed the image:
    - in SVG:

        ```SVG
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image href="(YOUR URL)" />
        </svg>
        ```

    - in HTML:

      ```HTML
      <!DOCTYPE html>
      <html>
        <head>
          ...
        </head>
        <body>
          <img src="(YOUR URL)" />
        </body>
      </html>
      ```
