import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import { config } from "theme/index"

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.cdnfonts.com/css/sf-mono"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript
            initialColorMode={config.initialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
