const initState = {
  notices: [
    {
      title: "공지",
      content:
        "이번주 예배는 2부로 나누어 드립니다\n\n\n1부는 1:30 2부는 4:00셀원들에게 잘 광고해주세요."
    },
    {
      title: "생일",
      content: "It's Johnny's birthday today!"
    },
    {
      title: "생일",
      content: "It's Johnny's birthday today!"
    },
    {
      title: "생일",
      content: "It's Johnny's birthday today!"
    },
    {
      title: "생일",
      content: "It's Johnny's birthday today!"
    },
    {
      title: "생일",
      content: "It's Johnny's birthday today!"
    }
  ]
}

const noticeReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_NOTICE":
      console.log("Created Notice", action.notice)
  }
  return state
}

export { noticeReducer }
