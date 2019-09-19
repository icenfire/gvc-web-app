import React, { Fragment, useEffect, useState } from "react"
import Authentication from "../../auth/Authentication"
import SignOutButton from "../Level1/Buttons/SignOutButton"
import PapersFull from "../Level2/Cards/PapersFull"
import Dates from "../Level2/Dates";
import { db } from "../../firebase";
import { disconnect } from "cluster";
// import CardsFull from "./Level2/Cards/CardsFull";

// export interface State {
//   dates: string[]
// }

export default function LoginPage() {
  // const [dates, setDates] = useState<State>({dates: []});
  const [dates, setDates] = useState([]);


  useEffect(() => {
    console.log('useEffact');
    
    db.collection("dates").onSnapshot(snapshot => {
      const datesDb : any = [];
      snapshot.forEach(doc => { datesDb.push(doc.data().date)})
      setDates(datesDb);
    });
    
  });
  return(
    <Fragment>
      <PapersFull />
      <SignOutButton onClick={signOut} />
      {/* <Dates date={date}/> */}
    </Fragment>
    )
  }

function signOut() {
  Authentication.signOut()
}
