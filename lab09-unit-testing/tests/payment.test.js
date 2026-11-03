const { processDebtPayment } = require("../src/payment");

describe("processDebtPayment - Kiểm thử thanh toán và công nợ khách hàng", () => {

  test("PAY01: Thanh toán một phần công nợ", () => {
    expect(processDebtPayment(500000, 200000)).toBe(300000);
  });

  test("PAY02: Thanh toán toàn bộ công nợ", () => {
    expect(processDebtPayment(500000, 500000)).toBe(0);
  });

  test("PAY03: Thanh toán số tiền nhỏ nhất là 1 đồng", () => {
    expect(processDebtPayment(500000, 1)).toBe(499999);
  });

  test("PAY04: Thanh toán vượt quá công nợ", () => {
    expect(() => processDebtPayment(500000, 600000))
      .toThrow("Số tiền thanh toán vượt quá công nợ");
  });

  test("PAY05: Số tiền thanh toán bằng 0", () => {
    expect(() => processDebtPayment(500000, 0))
      .toThrow("Số tiền thanh toán không hợp lệ");
  });

  test("PAY06: Số tiền thanh toán âm", () => {
    expect(() => processDebtPayment(500000, -100))
      .toThrow("Số tiền thanh toán không hợp lệ");
  });

  test("PAY07: Công nợ hiện tại âm", () => {
    expect(() => processDebtPayment(-500000, 100000))
      .toThrow("Công nợ hiện tại không hợp lệ");
  });

  test("PAY08: Số tiền thanh toán là chuỗi", () => {
    expect(() => processDebtPayment(500000, "abc"))
      .toThrow("Số tiền thanh toán không hợp lệ");
  });

  test("PAY09: Công nợ hiện tại là NaN", () => {
    expect(() => processDebtPayment(NaN, 100000))
      .toThrow("Công nợ hiện tại không hợp lệ");
  });

  test("PAY10: Số tiền thanh toán là Infinity", () => {
    expect(() => processDebtPayment(500000, Infinity))
      .toThrow("Số tiền thanh toán không hợp lệ");
  });

  test("PAY11: Không có công nợ nhưng vẫn thanh toán", () => {
    expect(() => processDebtPayment(0, 100000))
      .toThrow("Số tiền thanh toán vượt quá công nợ");
  });

  test("PAY12: Số tiền thanh toán là null", () => {
    expect(() => processDebtPayment(500000, null))
      .toThrow("Số tiền thanh toán không hợp lệ");
  });

});
