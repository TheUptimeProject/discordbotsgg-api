export default class DiscordBotsGG_API {
    private readonly m_base;
    private m_token;
    constructor(token: string);
    /**
     * Post stats to the api
     * @param id Client id of the bot
     * @param stats Stats to pass to the api
     */
    postStats(id: string, stats: {
        guildCount: number;
        shardID?: number;
        shardCount?: number;
    }): Promise<{
        shardCount: number;
        guildCount: number;
    }>;
    /**
     * Fetch a bot by client id
     * @param id Client id of the bot to fetch
     * @param options Fetch options
     */
    getBot(id: string, options?: {
        sanitizeDescription?: boolean;
    }): Promise<any>;
}
