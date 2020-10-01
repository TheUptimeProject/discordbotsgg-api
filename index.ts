import snekfetch from "snekfetch";

export default class DiscordBotsGG_API {
    private readonly m_base: string = "https://discord.bots.gg/api/v1";
    private m_token: string;

    constructor(token: string) {
        if (typeof token != "string") throw new Error("API Token must be a string");
        this.m_token = token;
    }

    /**
     * Post stats to the api
     * @param id Client id of the bot
     * @param stats Stats to pass to the api
     */
    public postStats(id: string, stats: { guildCount: number; shardID?: number; shardCount?: number }): Promise<{ shardCount: number; guildCount: number }> {
        return new Promise((resolve, reject) => {
            // Type safety checks
            if (typeof id != "string") reject("ID must be a string");
            if (!stats.guildCount) reject("Must provide a guildCount");
            if (typeof stats.guildCount != "number") reject("guildCount must be a number");
            if (stats.shardID) {
                if (typeof stats.shardID != "number") reject("shardID must be a number");
            }
            if (stats.shardCount) {
                if (typeof stats.shardCount != "number") reject("shardCount must be a number");
            }

            // Post stats
            snekfetch
                .post(`${this.m_base}/bots/${id}/stats`)
                .set("Authorization", this.m_token)
                .send(stats)
                .then((res) => {
                    //@ts-ignore
                    resolve(JSON.parse(res.body));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Fetch a bot by client id
     * @param id Client id of the bot to fetch
     * @param options Fetch options
     */
    public getBot(id: string, options: { sanitizeDescription?: boolean } = { sanitizeDescription: true }): Promise<any> {
        return new Promise((resolve, reject) => {
            // Type safety
            if (typeof id != "string") reject("ID must be a string");

            // Make request
            snekfetch
                .get(`${this.m_base}/bots/${id}`)
                .send({ sanitized: options.sanitizeDescription })
                .then((res) => {
                    //@ts-ignore
                    resolve(JSON.parse(res.body));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}