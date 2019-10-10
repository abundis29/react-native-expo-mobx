import { observable, action, computed, extendObservable } from 'mobx';
import { create, persist } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

class Store {
  constructor() {}

  /*
    Our application global state.
    It's observable, so can be updated with mobx.
  */
  @observable
  AppGlobalState = {
    SplashShowing: true,
    DemostrationVariable: false
  };

  /*
    This is some example data we might want to persist to storage.
    This is handy for storing a session token, favourites lists, or other data that needs to be retrieved across app restarts.
    See https://github.com/pinqy520/mobx-persist for docs.
  */
  @persist('object')
  @observable
  persistedUserData = {
    name: 'Some Data',
    count: 0
  };
}

const hydrate = create({
  storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
  jsonify: true // if you use AsyncStorage, this needs to be true
});

/*
  We create and export a singleton (a single instance of our state).
  This allows us to use inject and regular import to access the state.
*/
const singleton = new Store();
export default singleton;

// We hydrate anything we've persisted so that it is updated into the state on creation
hydrate('persistedUserData', singleton).then(() => {
  console.log('Hydrated: persistedUserData');
});
