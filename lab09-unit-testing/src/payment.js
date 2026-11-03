function processDebtPayment(currentDebt, paymentAmount) {
  // Kiểm tra công nợ hiện tại
  if (
    typeof currentDebt !== "number" ||
    !Number.isFinite(currentDebt) ||
    currentDebt < 0
  ) {
    throw new Error("Công nợ hiện tại không hợp lệ");
  }

  // Kiểm tra số tiền thanh toán
  if (
    typeof paymentAmount !== "number" ||
    !Number.isFinite(paymentAmount) ||
    paymentAmount <= 0
  ) {
    throw new Error("Số tiền thanh toán không hợp lệ");
  }

  // Kiểm tra số tiền thanh toán có vượt công nợ không
  if (paymentAmount > currentDebt) {
    throw new Error("Số tiền thanh toán vượt quá công nợ");
  }

  // Tính công nợ còn lại sau thanh toán
  const remainingDebt = currentDebt - paymentAmount;

  return remainingDebt;
}

module.exports = { processDebtPayment };
