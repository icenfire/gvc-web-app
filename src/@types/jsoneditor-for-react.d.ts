// Type definitions for jsoneditor-for-react 0.0
// Project: https://github.com/mixj93/jsoneditor-for-react#readme
// Definitions by:  JoshGoldberg <https://github.com/joshuakgoldberg>
//                  Joep Kockelkorn <https://github.com/joepkockelkorn>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0
declare module "jsoneditor-for-react" {
  import JSONEditor, { JSONEditorOptions } from "jsoneditor"
  import * as React from "react"

  export interface ReactJsonEditorProps {
    values: {}
    onChange: (values: any) => void
  }

  export default class ReactJsoneditor extends React.Component<
    ReactJsonEditorProps
  > {
    private editor?: JSONEditor
    private options?: JSONEditorOptions
  }
}
