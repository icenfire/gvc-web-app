import { db } from "./../firebase"

export const globalObjects = () => {
  // @ts-ignore
  window.createDummyMembers = () => {
    const startDate = new Date("1980/01/01")
    const endDate = new Date("2010/12/31")

    for (let cell = 1; cell <= 5; cell++) {
      for (let member = 0; member <= 3; member++) {
        db.collection("members")
          .doc(Math.random() + "")
          .set({
            name:
              "Cell" + cell + (member == 0 ? "-Leader" : "-Member" + member),
            cell: "" + cell,
            dob: new Date(
              startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
            ), // A random date between 1980/01/01 and 2010/12/31
            positions: member == 0 ? ["leader"] : [],
          })
          .then(() => console.log("Complete!"))
      }
    }
  }

  // Add more objects below
}
