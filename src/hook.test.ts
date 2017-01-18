// the unit test here

import { createAction, createFilter, HookLib } from './';

/**
 * Interface describing the action 
 */
export interface IAction {
    (target: number, meta: number): HookLib.Promise<any>;
    stack: Array<{
        (target: number, meta: number, next: { (err: Error, res: number): void }): void;
    }>;
}

// create action
let action: IAction = createAction([]);

// add a command to stack for action
action.stack.push((cargo: number, meta: number, next: { (err: Error, res: number): void }) => {

    return next(undefined, cargo * meta);
});

// do action and get result
action(4, 3).then((res: any) => {

    // output 12
    console.log(res);
});

/**
 * Interface describing the filter 
 */
export interface IFilter {
    (target: number, meta: number): HookLib.Promise<any>;
    stack: Array<{
        (target: number, meta: number, next: { (err: Error, res: number): void }): void;
    }>;
}

// create action
let filter: IFilter = createFilter([(cargo: number, meta: number, next: { (err: Error, cargo: number, meta: number): void }) => {

    return next(undefined, cargo * meta, meta);
}]);

// do action and get result
filter(4, 3).then((res: any) => {

    // output [12, 3]
    console.log(res);
});
