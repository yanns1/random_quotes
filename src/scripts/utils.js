// getEl :: String -> DOM Element
const getEl = sel => document.querySelector(sel)

// getEls :: String -> [DOM Element]
const getEls = sel => document.querySelectorAll(sel)

// getJSON :: String -> Promise(Object)
const getJSON = async (url) => {
    const res = await fetch(url)
    return res.json()
}

// pickRandomInArr :: [a] -> a
const pickRandomInArr = arr => arr[Math.round(Math.random() * (arr.length - 1))]

export { getEl, getEls, getJSON, pickRandomInArr }