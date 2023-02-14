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
        let { text } = msg;
        if (text === '/getreports') {
            return true;
        } else {
            return false;
        }
    }
    isClearCmd(msg) {
        let { text } = msg;
        if (text === '/clear') {
            return true;
        } else {
            return false;
        }
    }
}