export interface GenericSelectorProps<T> {
    value?: T;
    onValueChange: (value: T) => void;
    required?: boolean,
}
