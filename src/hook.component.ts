import * as Promise from 'bluebird';
import { waterfall, applyEach, constant } from 'async';
import { Action, Filter } from './hook.lib';

// obs i corrected something in typings for applyeach just added a line that works

/**
 * Create hookable action
 */
export function createAction<T extends Action>(stack: Array<any>): T {

    'use strict';

    // prepare action function
    let f: any = function (...args: Array<any>): Promise<any> {

        // return new promise of result
        return new Promise<any>((resolve: Function, reject: Function) => {

            // go for all the actors in stack
            applyEach(f.stack, args, (err: Error, result: Array<any>) => {

                // if error is made
                if (err) {
                    return reject(err);
                }

                // return the result
                resolve(result);
            });
        });
    };

    // save reference to the hooks
    f.stack = stack;

    // return the creation
    return f;
}

/**
 * Create hookable filter // løs problemet med meta for results
 */
export function createFilter<M, C>(stack: Array<any>): Filter<M, C> {

    'use strict';

    // prepare filter function
    let f: any = function (...args: Array<any>): Promise<any> {

        // return new promise of result
        return new Promise<any>((resolve: Function, reject: Function) => {

            // start a warterfall off all the stack
            waterfall([constant.apply(undefined, args)].concat(f.stack), (err: Error, ...results: Array<any>) => {

                // if error is made
                if (err) {
                    return reject(err);
                }

                // return the actual result as the last elemnt of the array
                resolve(results[results.length - 1]);
            });
        });
    };

    // save reference to the hooks
    f.stack = stack;

    // return the creation
    return f;
}