import authActions from './auth'
import profileActions from './profile'
import profilesActions from './profiles'
import tournamentsActions from './tournaments'

export default Object.assign({}, authActions, tournamentsActions, profilesActions, profileActions)
