const getNameInitialLetter = function(text: string) {
  const english = /^[A-Za-z ]*$/
  const korean = /[\u3131-\uD79D]/giu
  const initials = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"

  if (english.test(text)) {
    return text[0]
  } else {
    if (korean.test(text)) {
      let codePoint = text.codePointAt(0)
      if (codePoint !== undefined) {
        let init_index = Math.floor((codePoint - 44032) / 588)
        return initials[init_index]
      }
    } else {
      return "Name must be either in English or Korean"
    }
  }
}

export { getNameInitialLetter }
