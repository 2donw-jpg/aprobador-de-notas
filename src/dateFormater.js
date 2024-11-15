export function dateFormater(date){
    const originalDate = new Date(date);
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = originalDate.getFullYear();
    return `${day}-${month}-${year}`; 
}

export function dateFormaterEn(date){
    const originalDate = new Date(date);
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = originalDate.getFullYear();
    return `${year}-${month}-${day}`; 
}