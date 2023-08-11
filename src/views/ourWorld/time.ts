// 创建一个新的Date对象
const currentDate = new Date();

// 获取年、月、日
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 月份从0开始，所以要加1
const day = currentDate.getDate();

// 获取小时、分钟、秒
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// 将日期和时间格式化为字符串（可以根据需要进行自定义格式）
const formattedDate = `${year}-${month}-${day}`;
const formattedTime = `${hours}:${minutes}:${seconds}`;

console.log('当前日期:', formattedDate);
console.log('当前时间:', formattedTime);
const dateTime = {
    formattedDate,
    formattedTime
}
export default dateTime