## TODO LIST

- [ ] Use Formik for forms ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [ ] Implement custom components to be used with Formik ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [ ] Implement validation using Yup ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))
- [x] Join Auth and Firestore profile ([Youtube](https://www.youtube.com/watch?v=FD50LPJ6bjE), [Github](https://github.com/benawad/formik-2-example/tree/master))

## Notes

- 'firestoreReducer' from "redux-firestore" has "any" ReturnType and is able to hook up typescript definitions when using "useSelect" with "state.firestore"

- @date-io/date-fns 2.x(Dependency for @material-ui/pickers) seems to be broken and so we use 1.3.13 instead

- Seems like IconButton component should but doesn't expect a 'component' prop which causes Typescript error found in ProfileEditDialog.
  There has already been a similar issue with material-ui [here](https://github.com/mui-org/material-ui/issues/19068)

- Firestore automatically converts Date type into Timestamp type which causes some confusion. Timestamp must first be converted to Date type to use the usual Date methods.

- ~~react-swipeable-views currently has known bug with the latest version so we use version 0.13.3 which currently works~~ &larr; Fixed from 0.13.9

## Tips

- You can combine two class styles by doing className={\`${classes.style1} ${classes.style2}\`}
