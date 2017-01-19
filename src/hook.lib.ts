import * as Promise from 'bluebird';

// export promise
export {Promise};

/**
 * Next function for actions and beware of only a single output is accepted in the result
 * @param {Error | Undefined}   err     Any error made during execution  
 * @param {any}                 result  The result of the execution  
 */
export interface ActionNext extends Function {
    (err: any, result: any): void;
}

/**
 * Action that actually support multiple arguments where the last argument is ActionNext
 * @param {Array<any>}          ...args Multiple or singular argument passed to the hook
 * @param {ActionNext}          next    The next function to call with the result after the current is finished
 */
export interface ActionHook extends Function {
    (args: Array<any>, ...nextAndArgs: Array<any>): void;
}

/**
 * Action hooks are parallel and accept multiple arguments and return a single array of results in a resolved promise
 * @param {Array<any>}          args    Multiple or singular argument passed to the hooks  
 * @returns {Promise}           Array of results are returned
 */
export interface Action extends Function {
    (...args: Array<any>): Promise<Array<any>>;
    stack: Array<any>;
}

/**
 * Next function for filters supporting any number of arguments
 * @param {Error}               err         Any error made during execution  
 * @param {any}                 filtered    Array of filtered arguments
 */
export interface FilterNext extends Function {
    (err: any, ...filtered: Array<any>): void;
}

/**
 * The filter hook that actually support multiple arguments where the last argument is FilterNext
 * @param {Array<any>}          args    Multiple or singular argument passed to the hook  
 * @param {ActionNext}          next    The next function to call with the result after the current is finished
 */
export interface FilterHook extends Function {
    (args: any, ...nextAndArgs: Array<any>): void;
}

/**
 * Filtering is seriel and accept multiple arguments and return result in a resolved promise
 * @param   {Array<any>}        args    Multiple or singular argument passed to the hooks  
 * @returns {Promise}           Result of multiple results are resolved
 */
export interface Filter extends Function {
    (...args: Array<any>): Promise<any>;
    stack: Array<FilterHook>;
}
