export default class Validate {
    handler;

    constructor(handler) {
        this.handler = handler;
    }
    async validateMsg(msg) {
        if (this.isReportCmd(msg)) await this.handler.reportMsg(msg);
        else if (this.isGetReportsCmd(msg)) await this.handler.getReportsMsg(msg);
        else if (this.isClearCmd(msg)) await this.handler.clearMsg(msg);

    }


    isReportCmd(msg) {
        let { text } = msg;
        if (text.includes('#report')) {
            return true;
        } else {
            return false;
        }
    }

    isGetReportsCmd(msg) {
        let { from: { id }, text } = msg;
        if (text === '/getreports' && (id == 450797571 || id == 1222751218)) {
            return true;
        } else {
            return false;
        }
    }
    isClearCmd(msg) {
        let { from: { id }, text } = msg;
        if (text === '/clear' && (id == 450797571 || id == 1222751218)) {
            return true;
        } else {
            return false;
        }
    }
}