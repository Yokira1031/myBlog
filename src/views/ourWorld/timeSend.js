function sendRequest() {
    // 在这里编写发送请求的代码
    console.log('发送请求');
}

function scheduleRequest(targetTime) {
    const now = new Date();
    const [targetHour, targetMinute, targetSecond] = targetTime.split(':');
    const targetDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, targetSecond);

    if (targetDateTime > now) {
        const timeDelay = targetDateTime - now;
        setTimeout(function () {
            sendRequest();
        }, timeDelay);
    } else {
        console.log('指定时间已过');
    }
}

// 输入要发送请求的时间（格式为 "XX:XX:XX"）
const targetTime = '16:30:31';

// 调用scheduleRequest函数，传入目标时间
scheduleRequest(targetTime);

export default scheduleRequest