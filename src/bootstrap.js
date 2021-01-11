import { getUserData } from './reducers/auth';
import store from './reducers';

const bootstrap = () => 
    getUserData().then((user) => {
        store.dispatch({
            type: 'user/set',
            payload: user
        })
    })

export default bootstrap;
