import * as Promise from 'bluebird';

/**
 * Next function for actions and beware of only a single output is accepted in the result
 * @param {Error | Undefined}   err     Any error made during execution  
 * @param {any}                 result  The result of the execution  
 */
export interface ActionNext extends Function {
    (err: any, result: any): void;
}

/**
 * Example of action that actually support multiple arguments 
 * @param {Array<any>}          ...args Multiple or singular argument passed to the hook  
 * @param {ActionNext}          next    The next function to call with the result after the current is finished
 */
export interface ActionHook extends Function {
    (args: Array<any>, next: ActionNext): void;
}

/**
 * Example of parrallel action that accept multiple arguments and return a result in a resolved promise
 * @param {Array<any>}          ...args  Multiple or singular argument passed to the hooks  
 * @returns {Promise}           Array of results are returned
 */
export interface Action extends Function {
    (...args: Array<any>): Promise<Array<any>>;
    stack: Array<any>;
}

/**
 * Next function for filters supporting a varity of arguments
 * @param {Error | Undefined}   err     Any error made during execution  
 * @param {any}                 args    Array of filtered arguemtns
 */
export interface FilterNext extends Function {
    (err: any, ...args: Array<any>): void;
}

/**
 * The filter hook that actually support multiple arguments 
 * @param {Array<any>}          ...args Multiple or singular argument passed to the hook  
 * @param {ActionNext}          next    The next function to call with the result after the current is finished
 */
export interface FilterHook extends Function {
    (args: any, next: FilterNext): void;
}

/**
 * Example of seriel filtering that accept multiple arguments and return result in a resolved promise
 * @param   {Array<any>}        ...args  Multiple or singular argument passed to the hooks  
 * @returns {Promise}           Array of results are returned
 */
export interface Filter extends Function {
    (...args: Array<any>): void;
    stack: Array<FilterHook>;
}
