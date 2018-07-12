class EHub {
    constructor() {
        this.logs = [];
        this.plugins = new Map();
        this.reportUrl = 'monitor.ftoul.com';
    }
    // 运行插件，并把插件存到 plugins 里面
    // todo: 同一个插件不让挂载多次
    mount(monitor, name) {
        try {
            this.plugins.set(name, monitor);
            monitor({
                emit: (msg) => this.emit(msg, name)
            });
        }
        catch (err) {
            console.log('插件加载失败: ' + name + 'error:' + err);
            return false;
        }
        return true;
    }
    emit(msg, from) {
        // todo: post / get 上报
        this.logs.push(Object.assign({ id: msg.date + Math.floor(Math.random() * 100000), userAgent: navigator.userAgent || '', lang: navigator.language || '', from: from }, msg));
        // 500ms 延迟，如果期间多次触发就合并上报
        if (this.repProcess) {
            clearTimeout(this.repProcess);
            this.repProcess = setTimeout(() => this.reportToServerByImg(), 500);
        }
        else {
            this.repProcess = setTimeout(() => this.reportToServerByImg(), 500);
        }
    }
    // 通过图片上报数据（可跨域）
    reportToServerByImg() {
        const error = JSON.stringify(this.logs);
        const img = new Image();
        img.src = this.reportUrl + '?m=' + error;
        // 完了清空 logs 队列
        this.logs = [];
    }
}
