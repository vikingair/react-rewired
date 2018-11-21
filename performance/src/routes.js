// @flow

export type RouteValue = 'start' | 'one-input' | 'deeply-nested' | 'many-flat' | 'many-components' | 'live-coding';
export type Route = {| label: string, value: RouteValue |};
export const Routes: Route[] = [
    { label: 'Start', value: 'start' },
    { label: 'One Input', value: 'one-input' },
    { label: 'Deeply nested', value: 'deeply-nested' },
    { label: 'Many flat', value: 'many-flat' },
    { label: 'Many components', value: 'many-components' },
    { label: 'Live coding', value: 'live-coding' },
];
