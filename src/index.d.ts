import { FC, ReactNode } from 'react';

type StoreSetArg<DATA, PD> = PD | ((prev: DATA) => PD);
type StoreSet<DATA> = (update: StoreSetArg<DATA, Partial<DATA>>) => void;
type StoreType<DATA> = {
    get: () => DATA;
    set: StoreSet<DATA>;
    root: FC<{ children: ReactNode }>;
    wire: <StoreProps, OwnProps>(
        component: FC<StoreProps & OwnProps>,
        storeToProps: (state: DATA) => StoreProps
    ) => FC<OwnProps>;
};
type CreateStoreType = <DATA>(data: DATA) => StoreType<DATA>;

export const createStore: CreateStoreType;
