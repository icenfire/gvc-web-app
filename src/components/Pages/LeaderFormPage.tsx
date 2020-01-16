import React, { Fragment, useEffect, useState } from "react"
import Authentication from "../../auth/Authentication"
import SignOutButton from "../Level1/Buttons/SignOutButton"
import PapersFull from "../Level2/Cards/PapersFull"
import Dates from "../Level2/Dates"
import { db } from "../../firebase"
import { disconnect } from "cluster"
// import CardsFull from "./Level2/Cards/CardsFull";

// export interface State {
//   dates: string[]
// }

export default function LoginPage() {
  // const [dates, setDates] = useState<State>({dates: []});
  const [dates, setDates] = useState([])

  useEffect(() => {
    console.log("useEffact")
    const getDates = db
      .collection('dates')
      .onSnapshot((snapshot: any) => {
        const datesDb: any = [];
        snapshot.forEach((doc: any) => {
          datesDb.push(doc.data().date)
        })
        setDates(datesDb);
        console.log('datesDB', datesDb);
      }, err => {
        console.log('error', err);
      })
      return () => getDates();
  }, [])

  return (
    <Fragment>
      <PapersFull />
      <SignOutButton onClick={signOut} />
      <Dates dates={dates}/>
    </Fragment>
  )
}

function signOut() {
  Authentication.signOut()
}
