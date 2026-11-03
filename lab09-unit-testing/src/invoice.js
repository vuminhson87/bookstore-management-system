
function calculateInvoiceTotal(items) {
  if (!Array.isArray(items)) {
    throw new Error("Danh sách sách không hợp lệ");
  }

  let total = 0;

  for (const item of items) {
    if (
      !item ||
      typeof item.importPrice !== "number" ||
      !Number.isFinite(item.importPrice) ||
      item.importPrice < 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      throw new Error("Thông tin sách không hợp lệ");
    }

    const sellingPrice = item.importPrice * 1.05;
    total += sellingPrice * item.quantity;
  }

  return total;
}

module.exports = { calculateInvoiceTotal };
