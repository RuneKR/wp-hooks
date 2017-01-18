// the unit test here

import { createAction, HookLib } from './';

/**
 * Example of an action hook with only one argument a cargo
 */
export interface ExampleActionHook extends Function {
    (cargo: number, meta: number, next: HookLib.ActionNext): void;
}

/**
 * Base action
 */
export interface Action extends HookLib.Action {
    stack: Array<ExampleActionHook>;
}

let action: Action = createAction([]);

action.stack.push((cargo: number, meta: number, next: HookLib.ActionNext) => {

    return next(undefined, cargo * 2 * meta);
});

action(4, 2).then((res: any) => {

    console.log(res);

});

action(4, 3).then((res: any) => {

    console.log(res);

});

