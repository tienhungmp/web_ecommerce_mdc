export function removeAccents(name) {
    if (typeof name !== 'string') return ''; // Kiểm tra nếu không phải chuỗi, trả về chuỗi rỗng
    return name
        .normalize('NFD') // Chuẩn hóa chuỗi, tách dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
        .replace(/đ/g, 'd') // Chuyển "đ" thành "d"
        .replace(/Đ/g, 'D') // Chuyển "Đ" thành "D"
        .replace(/[^a-zA-Z0-9\s]/g, '') // Xóa ký tự đặc biệt, chỉ giữ chữ và số
        .trim() // Loại bỏ khoảng trắng thừa ở đầu và cuối
        .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
        .toLowerCase(); // Đưa chuỗi về chữ thường
}

export function formatCash(numb) {
    const str = numb.toString();
    return (
        str
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            }) + '₫'
    );
}

export function lowercaseFirstLetter(inputString) {
    return inputString.charAt(0).toLowerCase() + inputString.slice(1);
}
