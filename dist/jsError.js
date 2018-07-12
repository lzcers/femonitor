// 当JavaScript运行时错误（包括语法错误）发生时，window会触发一个ErrorEvent接口的error事件，并执行window.onerror()。
// 用于捕获运行时的 js 错误，包括语法错误
// 加载非同域的脚本报错时，语法错误的细节将不会报告，而代之简单的"Script error."，
// 1. 通过在 <script> 使用 crossorigin 属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。
// 2. 当然，也可以参考 badjs 对所有已知的非同源函数入口做切面包裹 try cath 参考 https://github.com/BetterJS/badjs-report/issues/3
// 3. 对于使用 webpack 等打包工具的代码可以尝试编写 babeljs 或者 webpack 插件自动加 try catch (try catch 可能影响编译器优化影响性能)
function jsError($) {
    // 备份原有的 errorHandler
    const errHandler = window.onerror;
    window.onerror = function (message, source, lineno, colno, error) {
        let msg = '';
        const errInfo = {
            message,
            lineno,
            colno,
            source // 发生错误的脚本URL（字符串）
        };
        // 如果 error 非空且有错误堆栈
        // 没有堆栈信息还能递归 arguments.callee.caller 拿
        if (error && error.stack) {
            // 格式化堆栈信息
            msg = error.message + '\n ' + error.stack;
        }
        else if (!!arguments.callee) {
            //尝试通过callee拿堆栈信息
            let f = arguments.callee.caller, c = 3;
            // 抓三层
            while (f && --c > 0) {
                msg += f.toString() + ',';
                if (f === f.caller)
                    break;
                f = f.caller;
            }
        }
        // 发送给 EventHub， 不一定会上报
        // 没有 source 报错没意义，报了也不知道错在哪
        // 跨域的 script error 也救不了
        // 随机上报（抽样上报）取 0.314 即 31.4%
        if (source &&
            !message.toLowerCase().includes('script error') &&
            Math.random() <= 0.314) {
            $.emit({
                type: 'jsErr',
                date: new Date().getTime(),
                source: errInfo.source,
                content: Object.assign({}, errInfo, { msg })
            });
        }
        // 再调用原有的 onerror 处理
        errHandler && errHandler.apply(this, arguments);
    };
}
