const getKoreanInitial = function(char: string) {
  const initials = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"
  let codePoint = char.codePointAt(0)

  if (codePoint !== undefined) {
    let init_index = Math.floor((codePoint - 44032) / 588)
    return initials[init_index]
  }
}

export { getKoreanInitial}
