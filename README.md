## TODO LIST

- [ ] Make "name" prop in form fields in SignInUpPageStatic one of key of IValues
- [x] Implement rerouting for signin/up &larr; (See Issue 1.)
- [x] Implement progress animation
- [x] Implement reset password
- [x] Make the yup input object, type safe with IValues
- [x] Implement Signin/up error message
- [x] Implement Remember me
- [x] Use Formik for forms ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Implement custom components to be used with Formik ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Implement validation using Yup ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Join Auth and Firestore profile ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))

## Issues

- 1. Rerouting after signin currently has a problem. After success, in the promise, the redux state for auth is not yet updated and therefore made a temporary fix by waiting 1 millisecond. See the 'signIn' function in 'authActions.ts'

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
