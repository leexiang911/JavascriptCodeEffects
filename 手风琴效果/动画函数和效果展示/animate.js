/**
 * 封装的运动函数
 * @param {*} opitions 
 */
function createAnimation(opitions) {
    let from = opitions.from;// 起始值
    let to = opitions.to;// 结束值
    let totalMS = opitions.totalMS || 1000;// 变化总时间，默认1000毫秒
    let duration = opitions.duration || 15;// 每多少时间变化一次,动画间隔时间
    let times = Math.floor(totalMS / duration);// 变化的次数
    let dis = (to - from) / times;// 每一次变化的值
    let curTimes = 0; // 当前变化的次数
    let timerId = setInterval(function () {
        from += dis;
        curTimes++;// 当前变化增加了一次
        if (curTimes >= times) {
            // 变化的次数已经达到了
            from = to;// 变化完成
            clearInterval(timerId);// 不再变化

            // 运行完成后执行传入的回调函数
            opitions.onend && opitions.onend();
        }
        // 有回调函数就执行回调函数
        opitions.onmove && opitions.onmove(from);
    }, duration)
}

// createAnimation({
//     from: 120,
//     to: 0,
//     totalMS: 500,
//     duration: 10,
//     onmove: function (n) {
//         // n 为这一次变化的值
//         console.log("回调函数运行", n)
//     },
//     onend: function () {
//         // 变化完成后运行该函数
//         console.log(777)
//     }
// })