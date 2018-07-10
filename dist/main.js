const mo1 = ($) => {
    setInterval(() => {
        $.emit({
            type: 'test',
            date: new Date().getTime(),
            url: 'test',
            content: 'test'
        });
    }, 1000);
};
class EHub {
    constructor() {
        this.plugins = new Map();
    }
    // 运行插件，并把插件存到 plugins 里面
    // todo: 考虑让插件在 web worker 里面跑？
    mount(monitor, name) {
        try {
            this.plugins.set(name, monitor);
            monitor({
                emit: (msg) => this.emit(msg, name)
            });
        }
        catch (err) {
            console.log('插件加载失败: ' + err);
            return false;
        }
        return true;
    }
    emit(msg, from) {
        console.log(from);
        console.log(msg);
        return false;
    }
}
const hub = new EHub();
hub.mount(mo1, 'testPlugin');
hub.mount(mo1, 'xxxPlugin');
