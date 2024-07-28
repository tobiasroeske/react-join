function truncateDescription(description:string, maxLength: number = 30) {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
}

export default truncateDescription;