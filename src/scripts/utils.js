// getEl :: String -> DOM Element
const getEl = sel => document.querySelector(sel)

// getEls :: String -> [DOM Element]
const getEls = sel => document.querySelectorAll(sel)

export { getEl, getEls }