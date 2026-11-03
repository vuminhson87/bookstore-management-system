
const { calculateInvoiceTotal } = require("../src/invoice");

describe("calculateInvoiceTotal - Tính tổng tiền hóa đơn bán sách", () => {
  test("TC01: Một sách, số lượng 2", () => {
    expect(calculateInvoiceTotal([
      { importPrice: 100000, quantity: 2 }
    ])).toBe(210000);
  });

  test("TC02: Hóa đơn gồm hai đầu sách", () => {
    expect(calculateInvoiceTotal([
      { importPrice: 50000, quantity: 2 },
      { importPrice: 100000, quantity: 1 }
    ])).toBe(210000);
  });

  test("TC03: Một sách, số lượng 1", () => {
    expect(calculateInvoiceTotal([
      { importPrice: 80000, quantity: 1 }
    ])).toBe(84000);
  });

  test("TC04: Danh sách sách rỗng", () => {
    expect(calculateInvoiceTotal([])).toBe(0);
  });

  test("TC05: Giá nhập bằng 0", () => {
    expect(calculateInvoiceTotal([
      { importPrice: 0, quantity: 2 }
    ])).toBe(0);
  });

  test("TC06: Giá nhập âm", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: -50000, quantity: 1 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC07: Giá nhập là chuỗi", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: "abc", quantity: 1 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC08: Giá nhập là NaN", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: NaN, quantity: 1 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC09: Giá nhập là Infinity", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: Infinity, quantity: 1 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC10: Số lượng bán bằng 0", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: 100000, quantity: 0 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC11: Số lượng bán âm", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: 100000, quantity: -1 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC12: Số lượng bán không phải số nguyên", () => {
    expect(() => calculateInvoiceTotal([
      { importPrice: 100000, quantity: 1.5 }
    ])).toThrow("Thông tin sách không hợp lệ");
  });

  test("TC13: Danh sách sách không phải mảng", () => {
    expect(() => calculateInvoiceTotal("abc"))
      .toThrow("Danh sách sách không hợp lệ");
  });
});
