// 交互
let titles = window.document.querySelectorAll('.menu h2');// 获取所有的标题元素

let itemHeight = 30;// 每个子菜单的高度
let totalMS = 300;//播放动画的总时常
// 循环注册点击事件
for (let i = 0; i < titles.length; i++) {
    titles[i].onclick = function () {
        /* 如果想要收起其他已经打开的菜单 */
        let beforeOpened = document.querySelector('.submenu[status=opened]');
        if (beforeOpened) {
            closeSubmenu(beforeOpened)
        }

        toggleSubmenu(this.nextElementSibling);
    }
}

let testMenu = document.querySelector('.submenu')

/**
 * 打开子菜单
 * @param {Document} subMenu 
 */
function openSubmenu(subMenu) {
    // 子菜单有三个状态（关闭、打开、正在播放动画）
    // 通过自定义属性status，判定他的状态
    let status = subMenu.getAttribute('status');
    if (status !== 'closed' && status) {
        // 不是关闭状态,他有值但是不是closed,那么啥也不干
        return;
    }

    // 状态设置为播放中，表示要开始运行动画了,
    subMenu.setAttribute("status", "playing")

    let to = itemHeight * subMenu.children.length;// 将子菜单的高度从0变到？(子项数量*itemHeight)
    createAnimation({
        from: 0,
        to: to,
        totalMS: totalMS,
        onmove: function (e) {
            console.log(e)
            subMenu.style.height = e + 'px'
        },
        onend: function () {
            // 动画运行结束,状态为打开
            subMenu.setAttribute("status", 'opened')
        }
    })
}

/**
 * 关闭子菜单
 * @param {Document} subMenu 
 */
function closeSubmenu(subMenu) {
    let status = subMenu.getAttribute('status');
    if (status !== 'opened') {
        // 状态不是打开就啥也不干
        return;
    }
    // 状态设置为播放中，表示要开始运行动画了,
    subMenu.setAttribute("status", "playing");

    let to = itemHeight * subMenu.children.length;// 将子菜单的高度变到0？(子项数量*itemHeight)

    createAnimation({
        from: to,
        to: 0,
        totalMS: totalMS,
        onmove: function (e) {
            console.log(e)
            subMenu.style.height = e + 'px'
        },
        onend: function () {
            // 动画运行结束,状态为打开
            subMenu.setAttribute("status", 'closed')
        }
    })
}

// 切换子菜单,关闭就打开,打开就关闭
function toggleSubmenu(subMenu) {
    let status = subMenu.getAttribute('status');
    if (status === 'playing') {
        // 正在播放动画,啥也不做
        return;
    } else if (status === 'opened') {
        // 打开状态就给关闭
        closeSubmenu(subMenu);
    } else {
        // 关闭状态,就给打开
        openSubmenu(subMenu);
    }
}