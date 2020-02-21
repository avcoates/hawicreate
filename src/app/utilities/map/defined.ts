import { filter } from 'rxjs/operators';

export function isDefined<T>(value: T | undefined | null | void): value is T;
export function isDefined(value: unknown): boolean {
    return value !== null && typeof value !== 'undefined';
}

export const filterEmpty = () => filter(isDefined);
