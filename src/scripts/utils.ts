const getEl = (sel: string): Element => document.querySelector(sel)!

const getEls = (sel: string): NodeListOf<Element> => document.querySelectorAll(sel)

const getJSON = async (url: string): Promise<any> => {
    const res = await fetch(url)
    return res.json()
}

const pickRandomInArr = <T>(arr: T[]): T => arr[Math.round(Math.random() * (arr.length - 1))]

const isErrorMess = (mess: string): boolean => /^Error/.test(mess)

const isCheckbox = (el: Element): boolean | undefined => el instanceof HTMLFormElement ? el.type === "checkbox" : undefined

const getNameOfInput = (el: Element): string | undefined => el instanceof HTMLInputElement ? el.name : undefined

const isChecked = (el: HTMLInputElement): boolean => el.checked === true

export { getEl, getEls, getJSON, pickRandomInArr, isErrorMess, isCheckbox, getNameOfInput, isChecked }