async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: "string",
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const myRequest = await response.json();
    console.log(myRequest);
  } catch (error) {
    console.error(error.message);
  }
}

//1: Tạo đối tượng Request
// Điều này cũng có nghĩa là bạn có thể tạo một yêu cầu từ một yêu cầu khác,
// trong khi thay đổi một số thuộc tính của nó bằng cách sử dụng
// đối số thứ hai:

async function ApiPost(request) {
  try {
    const response = await fetch(request);
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.log("Error:", error);
  }
}
const request1 = new Request("https://example.org/products.json", {
  method: "POST",
  headers: {
    "Cotent-Type": "application/json",
  },
  body: JSON.stringify({ username: "example1" }),
});
const request2 = new Request("https://example.org/products.json/post", {
  body: JSON.stringify({ username: "example2" }),
});

// 2: Hủy yêu cầu
// Nếu yêu cầu bị hủy bỏ sau khi lệnh gọi fetch() đã được
// thực hiện nhưng trước khi nội dung phản hồi được đọc, thì
// việc cố gắng đọc nội dung phản hồi sẽ từ chối với ngoại lệ AbortError.

async function get() {
  const controller = new AbortController();
  const request = new Request("https://example.org/products.json", {
    signal: controller.signal,
  });
  const response = await fetch(request);
  controller.abort();
  // Dòng tiếp theo sẽ ném ra `AbortError`
  const text = await response.text();
  console.log(text);
}

//3: Kiểm tra lệnh  headers: { "Cotent-Type": "application/json"}

// Cũng giống như yêu cầu, phản hồi có thuộc tính headers là đối tượng
//  Headers và điều này chứa bất kỳ tiêu đề phản hồi nào được tiếp xúc với
// tập lệnh, tùy thuộc vào các loại trừ được thực hiện dựa trên loại phản hồi.

// Một trường hợp sử dụng phổ biến cho việc này là kiểm tra loại nội dung
// trước khi cố gắng đọc nội dung:
async function fetch(params) {
  try {
    const response = await fetch(params);
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//4: Đọc nội dung response trả về
//Giao diện Response cung cấp một số phương pháp để truy xuất toàn bộ
//nội dung cơ thể ở nhiều định dạng khác nhau:
// Response.arrayBuffer()
// Response.blob()
// Response.formData()
// Response.json()
// Response.text()
