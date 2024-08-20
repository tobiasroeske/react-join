export default function getInitials(name: string | null): string {
    if (!name) return '';
    let names = name.split(' ');
    let initials = names.map(name => name.charAt(0).toUpperCase());
    return initials.join('');
}