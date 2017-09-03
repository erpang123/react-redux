import { bindActionCreators } from 'redux'
import * as AllActions from '../action/action1'

export default (dispatch) => {
	return {
		action: bindActionCreators(AllActions, dispatch)
	}
}