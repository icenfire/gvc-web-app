import moment from "moment"

import { db } from "./../firebase"

export const globalObjects = () => {
  // @ts-ignore
  window.createDummyMembers = () => {
    const startDate = new Date("1980/01/01")
    const endDate = new Date("2010/12/31")

    for (let cell = 1; cell <= 5; cell++) {
      for (let member = 0; member <= 3; member++) {
        db.collection("members")
          .doc("c" + cell + "m" + member)
          .set({
            name:
              "Cell" + cell + (member === 0 ? "-Leader" : "-Member" + member),
            cell: "" + cell,
            dob: new Date(
              startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
            ), // A random date between 1980/01/01 and 2010/12/31
            positions: member === 0 ? ["leader"] : [],
          })
          .then(() => console.log("Complete!"))
      }
    }
  }

  // @ts-ignore
  window.createPrayers = () => {
    for (let cell = 1; cell <= 5; cell++) {
      for (let member = 0; member <= 3; member++) {
        for (let day = 0; day <= 2; day++) {
          let date = new Date("2020/01/" + (7 * day + 1))
          db.collection("prayers")
            .add({
              memberId: "c" + cell + "m" + member,
              cell: "" + cell,
              date,
              prayer: `Prayer of ${"Cell" +
                cell +
                (member === 0
                  ? "-Leader"
                  : "-Member" + member)} created at ${moment(date).format(
                "Do MMM YYYY"
              )}`,
            })
            .then(() => console.log("Complete!"))
        }
      }
    }
  }
  // Add more objects below
}
