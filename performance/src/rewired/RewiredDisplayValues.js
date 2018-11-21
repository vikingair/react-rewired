// @flow

import { RewiredStore } from './rewired-store';
import { DisplayValues } from '../common/DisplayValues';

type RewiredDisplayValuesStoreProps = {| data: Object |};
type RewiredDisplayValuesOwnProps = {||};

export const RewiredDisplayValues = RewiredStore.wire<RewiredDisplayValuesStoreProps, RewiredDisplayValuesOwnProps>(
    DisplayValues,
    data => ({ data })
);
