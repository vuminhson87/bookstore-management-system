function validateBookSale(customer, book) {
  // Kiểm tra thông tin khách hàng
  if (
    !customer ||
    typeof customer.debt !== "number" ||
    !Number.isFinite(customer.debt) ||
    customer.debt < 0
  ) {
    throw new Error("Thông tin khách hàng không hợp lệ");
  }

  // Kiểm tra thông tin sách và số lượng bán
  if (
    !book ||
    !Number.isInteger(book.stock) ||
    book.stock < 0 ||
    !Number.isInteger(book.quantity) ||
    book.quantity <= 0
  ) {
    throw new Error("Thông tin sách không hợp lệ");
  }

  // Kiểm tra công nợ trước khi bán
  if (customer.debt > 20000) {
    return {
      allowed: false,
      reason: "Công nợ khách hàng vượt mức cho phép"
    };
  }

  // Kiểm tra số lượng tồn kho sau bán
  if (book.stock - book.quantity < 20) {
    return {
      allowed: false,
      reason: "Tồn kho sau bán không đủ mức tối thiểu"
    };
  }

  // Cho phép bán khi đáp ứng mọi điều kiện
  return {
    allowed: true,
    reason: "Đủ điều kiện bán sách"
  };
}

module.exports = { validateBookSale };
