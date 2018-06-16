/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import { WiredStoreUtil, type _WiredStore } from './wired-store';

export type WiredStore<T: { [string]: any }> = _WiredStore<T>;
export const Wired = { store: WiredStoreUtil.create, node: WiredStoreUtil.node };
