
const { validateBookSale } = require("../src/salesValidation");

describe("validateBookSale - Kiểm thử điều kiện bán sách", () => {

  test("BS01: Đủ điều kiện bán sách", () => {
    expect(
      validateBookSale(
        { debt: 10000 },
        { stock: 50, quantity: 10 }
      )
    ).toEqual({
      allowed: true,
      reason: "Đủ điều kiện bán sách"
    });
  });

  test("BS02: Công nợ vượt 20000 đồng", () => {
    expect(
      validateBookSale(
        { debt: 25000 },
        { stock: 50, quantity: 10 }
      )
    ).toEqual({
      allowed: false,
      reason: "Công nợ khách hàng vượt mức cho phép"
    });
  });

  test("BS03: Tồn kho sau bán dưới 20 cuốn", () => {
    expect(
      validateBookSale(
        { debt: 10000 },
        { stock: 25, quantity: 10 }
      )
    ).toEqual({
      allowed: false,
      reason: "Tồn kho sau bán không đủ mức tối thiểu"
    });
  });

  test("BS04: Công nợ đúng 20000 đồng", () => {
    expect(
      validateBookSale(
        { debt: 20000 },
        { stock: 50, quantity: 10 }
      ).allowed
    ).toBe(true);
  });

  test("BS05: Tồn kho sau bán đúng 20 cuốn", () => {
    expect(
      validateBookSale(
        { debt: 10000 },
        { stock: 30, quantity: 10 }
      ).allowed
    ).toBe(true);
  });

  test("BS06: Công nợ âm", () => {
    expect(() =>
      validateBookSale(
        { debt: -1000 },
        { stock: 50, quantity: 10 }
      )
    ).toThrow("Thông tin khách hàng không hợp lệ");
  });

  test("BS07: Công nợ là chuỗi", () => {
    expect(() =>
      validateBookSale(
        { debt: "abc" },
        { stock: 50, quantity: 10 }
      )
    ).toThrow("Thông tin khách hàng không hợp lệ");
  });

  test("BS08: Tồn kho âm", () => {
    expect(() =>
      validateBookSale(
        { debt: 10000 },
        { stock: -5, quantity: 1 }
      )
    ).toThrow("Thông tin sách không hợp lệ");
  });

  test("BS09: Số lượng bán bằng 0", () => {
    expect(() =>
      validateBookSale(
        { debt: 10000 },
        { stock: 50, quantity: 0 }
      )
    ).toThrow("Thông tin sách không hợp lệ");
  });

  test("BS10: Số lượng bán âm", () => {
    expect(() =>
      validateBookSale(
        { debt: 10000 },
        { stock: 50, quantity: -1 }
      )
    ).toThrow("Thông tin sách không hợp lệ");
  });

  test("BS11: Số lượng bán không nguyên", () => {
    expect(() =>
      validateBookSale(
        { debt: 10000 },
        { stock: 50, quantity: 1.5 }
      )
    ).toThrow("Thông tin sách không hợp lệ");
  });

  test("BS12: Công nợ là NaN", () => {
    expect(() =>
      validateBookSale(
        { debt: NaN },
        { stock: 50, quantity: 10 }
      )
    ).toThrow("Thông tin khách hàng không hợp lệ");
  });

});
