export function tryParseNumber(input: string): { success: boolean, value?: number } {
    const parsed = parseFloat(input);
    
    if (isNaN(parsed)) {
        return { success: false };
    } else {
        return { success: true, value: parsed };
    }
}
