import { disconnect } from "cluster"
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import Authentication from "../../auth/Authentication"
import { db } from "../../firebase"
import { signOut } from "../../store/actions/authActions"
import SignOutButton from "../Level1/Buttons/SignOutButton"
import PapersFull from "../Level2/Cards/PapersFull"
import Dates from "../Level2/Dates"

// import CardsFull from "./Level2/Cards/CardsFull";

// export interface State {
//   dates: string[]
// }

export const LeaderFormPage: FC = () => {
  // const [dates, setDates] = useState<State>({dates: []});
  const [dates, setDates] = useState([])
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(signOut())
  }

  useEffect(() => {
    console.log("useEffect")
    const getDates = db.collection("dates").onSnapshot(
      (snapshot: any) => {
        const datesDb: any = []
        snapshot.forEach((doc: any) => {
          datesDb.push(doc.data().date)
        })
        setDates(datesDb)
        console.log("datesDB", datesDb)
      },
      err => {
        console.log("error", err)
      }
    )
    return () => getDates()
  }, [])

  return (
    <Fragment>
      <PapersFull />
      <SignOutButton onClick={onClick} />
      <Dates dates={dates} />
    </Fragment>
  )
}
