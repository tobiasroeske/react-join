function capitalizeFirstCharater(name: string) {
    let nameAsArray = name.toLowerCase().split(' ');
    nameAsArray = nameAsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let capitalizedName = nameAsArray.join(' ');
    return capitalizedName;
}

export default capitalizeFirstCharater;