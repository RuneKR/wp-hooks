import * as Promise from 'bluebird';

/**
 * Base next function in action
 */
export interface ActionNext extends Function {
    (err: any, ...cargo: Array<any>): void;
}
/**
 * Example of an action hook with only one argument a cargo
 */
export interface ExampleActionHook extends Function {
    (cargo: any, next: ActionNext): void;
}

/**
 * Base action
 */
export interface Action extends Function {
    (...args: Array<any>): Promise<any>;
    stack: Array<any>;
}

/**
 * Base next function in filter
 */
export interface FilterNext<M, C> extends Function {
    (err: any, meta: M, cargo: C): void;
}
/**
 * Base filter hook
 */
export interface FilterHook<M, C> extends Function {
    (meta: M, cargo: C, next: FilterNext<M, C>): void;
}
/**
 * Base filter 
 */
export interface Filter<M, C> extends Function {
    (meta: M, cargo: C): void;
    stack: Array<FilterHook<M, C>>;
}
