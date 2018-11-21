// @flow

import connect from 'react-redux/es/connect/connect';
import { DisplayValues } from '../common/DisplayValues';

export const ReduxDisplayValues = connect(data => ({ data }))(DisplayValues);
