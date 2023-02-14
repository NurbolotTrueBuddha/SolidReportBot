import * as fs from 'node:fs/promises';

export default class Handler {
    bot;

    constructor(bot) {
        this.bot = bot;
    }
    async reportMsg(msg) {
        let { from: { id, first_name }, text } = msg;
        text = text.substring(8)

        let userData = await fs.readFile('./reports.json', { encoding: 'utf8' });
        let converted = JSON.parse(userData);

        converted.push({ name: first_name, report: text });

        converted = JSON.stringify(converted, null, 2);
        await fs.writeFile('./reports.json', converted);
    }
    async getReportsMsg(msg) {

        let { chat: { id } } = msg

        if (id == 450797571 || id == 1222751218) {
            let userData = await fs.readFile('./reports.json', { encoding: 'utf8' });
            let converted = await JSON.parse(userData);
            for (let key in converted) {
                await this.bot.sendMessage(id, `${converted[key].name} \n ${converted[key].report}`)
            }
        }
    }
    async clearMsg(msg) {
        let { chat: { id } } = msg
        if (id == 450797571 || id == 1222751218) {
            let userData = await fs.readFile('./reports.json', { encoding: 'utf8' });
            userData = "[]";
            await fs.writeFile('./reports.json', userData);

        }
        this.bot.sendMessage(id, 'Файл репортов был очищен')
    }
}