import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import appReducer from './reducers/appReducer';
import musicReducer from './reducers/musicReducer';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId'],
};

export const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer),
});
