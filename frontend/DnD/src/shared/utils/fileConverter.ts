const base64 = "base64,";

export function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const data = reader.result as string;
            const base64Index = data.indexOf(base64) + base64.length;
            const base64Data = data.substring(base64Index);
            resolve(base64Data);
        }
        reader.onerror = error => reject(error);
    });
}
