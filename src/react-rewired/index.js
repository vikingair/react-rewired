/**
 * This file is part of wired-react which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import { WiredStoreUtil, type _WiredStore } from './wired-store';
import { WiredRoot } from './wired-root';

export type WiredStore<T: { [string]: any }> = _WiredStore<T>;
export const Wired = { store: WiredStoreUtil.create, root: WiredRoot, leaf: WiredStoreUtil.leaf };
