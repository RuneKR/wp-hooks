import * as Promise from 'bluebird';

// these are all examples of more or less one variable as args

/**
 * Base next function in action
 */
export interface ActionNext extends Function {
    (err: any, ...args: Array<any>): void;
}
/**
 * Example of an action hook with only one argument a cargo
 */
export interface ActionHook extends Function {
    (args: any, next: ActionNext): void;
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
export interface FilterNext extends Function {
    (err: any, ...args: Array<any>): void;
}
/**
 * Base filter hook
 */
export interface FilterHook extends Function {
    (args: any, next: FilterNext): void;
}
/**
 * Base filter 
 */
export interface Filter extends Function {
    (...args: Array<any>): void;
    stack: Array<FilterHook>;
}
