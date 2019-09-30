import { FC, ReactNode, ComponentClass } from 'react';

type StoreSetArg<DATA, PD> = PD | ((prev: DATA) => PD);
type StoreSet<DATA> = (update: StoreSetArg<DATA, Partial<DATA>>) => void;
type StoreType<DATA> = {
    get: () => DATA;
    set: StoreSet<DATA>;
    root: FC<{ children: ReactNode }>;
    wire: <StoreProps, OwnProps>(
        component: FC<StoreProps & OwnProps> | ComponentClass<StoreProps & OwnProps>,
        storeToProps: (state: DATA) => StoreProps
    ) => FC<OwnProps>;
};
type CreateStoreType = <DATA>(data: DATA) => StoreType<DATA>;
type WiredType = { store: CreateStoreType };

export const Wired: WiredType;
