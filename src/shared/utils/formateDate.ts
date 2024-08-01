export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}