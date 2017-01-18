import * as Promise from 'bluebird';
import { waterfall, applyEach, constant } from 'async';
import { Action, Filter } from './hook.lib';

/**
 * Create hookable action
 */
export function createAction<T extends Action>(stack: Array<any>): T {

    'use strict';

    // prepare action function
    let f: any = function (...args: Array<any>): Promise<any> {

        // return new promise of result
        return new Promise<any>((resolve: Function, reject: Function) => {

            // add the next parameter
            args.push((err: Error, result: Array<any>) => {

                // if error is made
                if (err) {
                    return reject(err);
                }

                // return the result
                resolve(result);
            });

            // add stack to args for applyEach
            args.unshift(f.stack);

            // do applyEach
            applyEach.apply(undefined, args);
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
export function createFilter<M, C>(stack: Array<any>): Filter {

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

                // check if there is multiple results
                if (results.length !== 1) {

                    // return the actual results
                    resolve(results);
                } else {

                    // return a single result
                    resolve(results[0]);
                }
            });
        });
    };

    // save reference to the hooks
    f.stack = stack;

    // return the creation
    return f;
}
