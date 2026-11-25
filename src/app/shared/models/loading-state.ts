
// SEVENS Aquatics - Shared Loading State Model

export type LoadingState<T> =
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'empty' }
    | { status: 'error'; message: string };
