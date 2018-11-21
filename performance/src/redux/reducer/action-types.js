// @flow

type OneInputChanged = { type: 'ONE_INPUT_CHANGED', change: string };
type DeepUpdateForced = { type: 'DEEP_UPDATE', update: number };
type FlatUpdateForced = { type: 'FLAT_UPDATE', update: number };
type ManyComponentsUpdateForced = { type: 'MANY_COMPONENTS_UPDATE', update: number };

export type Action = OneInputChanged | DeepUpdateForced | FlatUpdateForced | ManyComponentsUpdateForced;
