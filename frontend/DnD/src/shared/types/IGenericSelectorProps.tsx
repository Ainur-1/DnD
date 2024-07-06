export interface SelectorProps<T> {
    value?: T;
    onValueChange: (value: T) => void;
    required?: boolean;
    disabled?: boolean;
}
