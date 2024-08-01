function formatDateInText(timestamp: number): string {
    const date = new Date(timestamp);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format the date
    return `${month} ${day}, ${year}`;
}

export default formatDateInText