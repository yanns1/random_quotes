interface QuoteObj {
    author: string,
    quote: string
}

interface UserDoc {
    quotes: QuoteObj[],
    colors: string[]
}

export { QuoteObj, UserDoc }