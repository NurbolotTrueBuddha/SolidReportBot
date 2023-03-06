import * as fs from 'node:fs/promises';

export default class Handler {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    async reportMsg(msg) {

        let { from: { first_name }, text } = msg;
        text = text.substring(8)

        let userData = await fs.readFile('./reports.json', { encoding: 'utf8' });
        let converted = JSON.parse(userData);

        converted.push({ name: first_name, report: text });

        await fs.writeFile('./reports.json', JSON.stringify(converted, null, 2));

    }

    async getReportsMsg(msg) {

        let { chat: { id } } = msg

        let userData = await fs.readFile('./reports.json', { encoding: 'utf8' });
        let converted = await JSON.parse(userData);

        for (let key in converted) {
            await this.bot.sendMessage(id, `${converted[key].name}\n${converted[key].report}`)
        }
    }

    async clearMsg(msg) {
        let { chat: { id } } = msg
        let userData = await fs.readFile('./reports.json', { encoding: 'utf8' });

        userData = "[]";
        await fs.writeFile('./reports.json', userData);

        this.bot.sendMessage(id, 'Файл отчетов был очищен')
    }

    async initCmd(msg) {
        let { from: { first_name, id } } = msg;


        let studentData = await fs.readFile('./students.json', { encoding: 'utf8' });
        let convertedStudnet = await JSON.parse(studentData);
        let flag = true;
        for (let i in convertedStudnet) {
            if (convertedStudnet[i].id !== id) {

                convertedStudnet.push({ name: first_name, id: id, status: 0 })
                await fs.writeFile('./students.json', JSON.stringify(convertedStudnet, null, 2));

                flag = false;
                break;
            }
        }

        if (!flag) {

            this.bot.sendMessage(msg.chat.id, `Вы уже проинициализированы`);

        } else {


            await this.bot.sendMessage(msg.chat.id, `${first_name} 👍`);
        }



    }
}