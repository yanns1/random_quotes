// https://github.com/FortAwesome/react-fontawesome#installation
// https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
// See all importable stuff:
// import * as f from '@fortawesome/free-solid-svg-icons'
// console.dir(f)

// workaround for this issue: https://github.com/FortAwesome/react-fontawesome/issues/217
const myLibrary: any = library

myLibrary.add(fab, faQuoteLeft)
