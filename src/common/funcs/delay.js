export async function delay(duration) {
  // Hàm trả về một promise để trì hoãn (delay) trỏng khoảng thời gian được chỉ định (duration)
  return await new Promise((resolve) => setTimeout(resolve, duration));
}
