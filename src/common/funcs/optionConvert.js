import moment from "moment";
import md5 from "md5";

export function obfuscateEmail(email) {
  // Tách phần trước @ và phần tên miền
  const [username, domain] = email.split("@");
  // Giữ lại ký tự đầu tiên và cuối cùng của tên người dùng
  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  // Tạo phần che giấu giữa
  const middleHidden = "...";
  // Tạo tên người dùng mới với phần che giấu
  const newUsername = firstChar + middleHidden + lastChar;
  // Kết hợp với tên miền để tạo email đã che giấu
  const obfuscatedEmail = newUsername + "@" + domain;
  return obfuscatedEmail;
}
// Hàm đảm bảo rằng các số có một chữ số sẽ được thêm số 0 ở phía trước
export function checkTime(i) {
  if (Math.abs(i) < 10) {
    // Nếu giá trị tuyệt đối của số nhỏ hơn 10
    i = "0" + i; // Thêm số 0 ở phía trước
  }
  return i; // Trả về số đã được thêm số 0 hoặc giữ nguyên
}

// Hàm định dạng ngày giờ để submit, tùy thuộc vào việc đó là thời gian bắt đầu (from) hay kết thúc (to)
export const timeSubmit = (date, isTo) => {
  return date
    ? `${date.getFullYear()}-${checkTime(date.getMonth() + 1)}-${checkTime(
        date.getDate()
      )}T${isTo ? "23:59" : "00:00"}` // Nếu `isTo` là true, thêm '23:59' (kết thúc ngày), nếu false thì thêm '00:00' (bắt đầu ngày)
    : null; // Nếu không có ngày được cung cấp, trả về null
};

// Hàm lấy thời gian hiện tại và tạo ra một chuỗi key đã được mã hóa dựa trên thời gian đó
export function getKeyCert() {
  const key = process.env.NEXT_PUBLIC_KEY_CERT; // Lấy key từ biến môi trường
  const time = moment(new Date()).format("MM/DD/YYYY HH:mm:ss"); // Lấy thời gian hiện tại với định dạng 'MM/DD/YYYY HH:mm:ss'
  return {
    time: time, // Trả về thời gian đã định dạng
    keyCert: md5(`${key}${time}`), // Trả về chuỗi key được mã hóa bằng cách ghép key và thời gian lại rồi mã hóa
  };
}

// Hàm loại bỏ dấu tiếng Việt khỏi chuỗi ký tự
export function removeVietnameTones(str) {
  str = str?.toLowerCase(); // Chuyển chuỗi thành chữ thường
  str = str?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"); // Thay thế tất cả các biến thể của chữ 'a' có dấu bằng 'a'
  str = str?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"); // Thay thế tất cả các biến thể của chữ 'e' có dấu bằng 'e'
  str = str?.replace(/ì|í|ị|ỉ|ĩ/g, "i"); // Thay thế tất cả các biến thể của chữ 'i' có dấu bằng 'i'
  str = str?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"); // Thay thế tất cả các biến thể của chữ 'o' có dấu bằng 'o'
  str = str?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"); // Thay thế tất cả các biến thể của chữ 'u' có dấu bằng 'u'
  str = str?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"); // Thay thế tất cả các biến thể của chữ 'y' có dấu bằng 'y'
  str = str?.replace(/đ/g, "d"); // Thay thế chữ 'đ' bằng 'd'
  return str; // Trả về chuỗi đã được loại bỏ dấu tiếng Việt
}
