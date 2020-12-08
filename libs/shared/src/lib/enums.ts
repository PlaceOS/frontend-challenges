export module Enums{

    export enum UserType{
        NORMAL = 0,
        ADMIN
    }

    export enum TaskStatus{
        ACTIVE = "active",
        DONE = "done"
    }

    export enum EventName{
        USER_SIGN_IN = "usersignin",
        USER_SIGN_OUT = 'usersignout',
        USER_SELECTED = 'userselected',
        USER_TASK_UPDATED = 'usertaskupdated'
    }

    export enum HttpCode{
        UNAUTHORIZED = '401',
        NOT_FOUND = '404'
    }
}