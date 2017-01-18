// the unit test here

import { createAction, HookLib } from './';

/**
 * Example of an action hook with only one argument a cargo
 */
export interface ExampleActionHook extends Function {
    (cargo: number, next: HookLib.ActionNext): void;
}

/**
 * Base action
 */
export interface Action extends HookLib.Action {
    stack: Array<ExampleActionHook>;
}

let action: Action = createAction([]);

action.stack.push((cargo: number, next: HookLib.ActionNext) => {

    return next(undefined, cargo * 2);
});
