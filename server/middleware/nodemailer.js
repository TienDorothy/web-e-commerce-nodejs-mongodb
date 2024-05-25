const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const sendEmail = async (user, products, total) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const html = `
       <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="padding: 2rem; color: #fff; background-color: rgba(0, 0, 0, 0.8);">
    <h1>Xin Chào User ${user.fullName}</h1>
    <p>Phone: ${user.phone}</p>
    <p>Address: ${user.address}</p>
    <br>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #fff; padding: 8px; text-align: left;">Tên sản phẩm</th>
          <th style="border: 1px solid #fff; padding: 8px; text-align: left;">Hình ảnh</th>
          <th style="border: 1px solid #fff; padding: 8px; text-align: left;">Giá</th>
          <th style="border: 1px solid #fff; padding: 8px; text-align: left;">Số lượng</th>
          <th style="border: 1px solid #fff; padding: 8px; text-align: left;">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dữ liệu sản phẩm sẽ được đổ vào đây -->
        ${products
          .map(
            (item, index) => `
          <tr key="${index}">
            <td style="border: 1px solid #fff; padding: 8px; text-align: left;">${
              item.product.name
            }</td>
            <td style="border: 1px solid #fff; padding: 8px; text-align: left;"><img src="${
              item.product.img1
            }" alt="${item.product.name}" width="100"></td>
            <td style="border: 1px solid #fff; padding: 8px; text-align: left;">${item.product.price.toLocaleString(
              "vi-VN"
            )}</td>
            <td style="border: 1px solid #fff; padding: 8px; text-align: left;">${
              item.quantity
            }</td>
            <td style="border: 1px solid #fff; padding: 8px; text-align: left;">${(
              item.product.price * item.quantity
            ).toLocaleString("vi-VN")}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    <br>
    <h1>Tổng thanh toán:</h1>
    <h1>${total.toLocaleString("vi-VN")} VND</h1>
    <br>
    <h1>Cảm ơn bạn!</h1>
  </body>
</html>`;

    
    const mailOpts = {
      from: process.env.NODEMAILER_USER,
      to: user.email,
      subject: "Confirmation Email for Your Order",
      html: html,
    };

    await transporter.sendMail(mailOpts,function (err, info) {
      if (!err) {
        console.log('Email send :>> ', info.response);
        return true
      }
    });
  } catch (error) {
    throw error;
  }
};
module.exports = sendEmail;
///
