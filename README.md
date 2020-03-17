## TODO LIST

- [x] Implement Absolute importing
- [x] 13/03/20 - Add notices page
- [x] 12/03/20 - Implement delete profile photo
  - Implemented basic delete function
  - ~~Issue: Dialog does not update its states/render after close e.g. After deleting/uploading photo, previous state of image is left behind. After closing the dialog once more manually then opening fixes the issue~~ &larr; Solved with useEffect hook
  - TODO: Replace position of "Cancel delete" to the "Choose Image" - Done
- [x] 12/03/20 - Typed up date objects depending on download(firestore Timestamp) or upload(Date)
- [x] 11/03/20 - Implement Photo upload
- [x] 11/03/20 - Implement displaying profile photo
- [x] Implement Prayers page
- [ ] Implement formik with edit profile card
- [ ] Implement "Go back to previous page" after sign in for public pages too
- [x] Included "Playground" item to the sidebar
- [x] Implemented conditional "My Account/Sign In" item in the sidebar
- [x] Finish styling the edit profile card
- [x] Implement edit profile card
- [x] Implemented sign out button and made appbar take title prop
- [x] Implemented search function to filter the members list
- [x] Make Account, Members, Prayers, Calendar page at the side bar
- [x] Implement rerouting for signin/up &larr; (See Issue 1.)
  - Update: Solved Issue 1.
- [x] Implement progress animation
- [x] Implement reset password
- [ ] Make "name" prop in form fields in SignInUpPageStatic one of key of IValues
- [x] Make the yup input object, type safe with IValues
- [x] Implement Signin/up error message
- [x] Implement Remember me
- [x] Use Formik for forms ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Implement custom components to be used with Formik ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Implement validation using Yup ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Join Auth and Firestore profile ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))

## Issues

Issue 2. How to reproduce error: "/public" &rarr; "/" &rarr; "public". This creates "TypeError: Cannot read property 'name' of undefined" error. The problem is the list "membersDic" in this setting is not fully loaded which causes the error. We need to somehow find a way to make sure to render only after all the data is ready.

- UPDATE: Partially solved by filtering out the prayer list which only has memberId in the membersDic. Still, the problem lies why does the membersDic load slowly when we return to the public page?

~~Issue 1. Rerouting after signin currently has a problem. After success, in the promise, the redux state for auth is not yet updated and therefore made a temporary fix by waiting 1 millisecond. See the 'signIn' function in 'authActions.ts'~~ &larr; Solved by checking for authstate and redirecting by conditionally returning redirect on signin page

- UPDATE: Properly implemented rerouting all in PrivateRouter component

## Questions

- [ ] How should we structure our database? In particular, if we only have members details have one source of truth on "members" collection, then users like 목사님 may end up doing 300+ reads every session. This could be dealt with: caching/having multiple source of truth synchronised by firefunctions/summary document
- [ ] There is a lag between firebase auth update and redux-firebase state
- [ ] How should we sign people up?

## Notes

- 'firestoreReducer' from "redux-firestore" has "any" ReturnType and is able to hook up typescript definitions when using "useSelect" with "state.firestore"

- @date-io/date-fns 2.x(Dependency for @material-ui/pickers) seems to be broken and so we use 1.3.13 instead

- Firestore automatically converts Date type into Timestamp type which causes some confusion. Timestamp must first be converted to Date type to use the usual Date methods.

- ~~Seems like IconButton component should but doesn't expect a 'component' prop which causes Typescript error found in ProfileEditDialog.
  There has already been a similar issue with material-ui [here](https://github.com/mui-org/material-ui/issues/19068)~~ &larr; Seems fixed now

- ~~react-swipeable-views currently has known bug with the latest version so we use version 0.13.3 which currently works~~ &larr; Fixed from 0.13.9

## Tips

- You can combine two class styles by doing className={\`${classes.style1} ${classes.style2}\`}
