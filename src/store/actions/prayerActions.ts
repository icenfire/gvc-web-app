import { Dispatch } from "redux"
import { TPrayerQueries } from "src/types"
import { QUERY_PRAYER } from "src/types/actions"

export const queryPrayer = (
  prayerQueries: TPrayerQueries,
  navigateToPrayerPage: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: QUERY_PRAYER,
      payload: prayerQueries,
    })
    navigateToPrayerPage()
  }
}
