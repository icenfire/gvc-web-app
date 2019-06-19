import Link from "@material-ui/core/Link"
import * as React from "react"
import { Link as RouterLink } from "react-router-dom"

export default function MyLink(props: any) {
  return <Link component={RouterLink} {...props} />
}
