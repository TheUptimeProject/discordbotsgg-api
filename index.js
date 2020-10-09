"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
class DiscordBotsGG_API {
    constructor(token) {
        this.m_base = "https://discord.bots.gg/api/v1";
        if (typeof token != "string")
            throw new Error("API Token must be a string");
        this.m_token = token;
    }
    /**
     * Post stats to the api
     * @param id Client id of the bot
     * @param stats Stats to pass to the api
     */
    postStats(id, stats) {
        return new Promise((resolve, reject) => {
            // Type safety checks
            if (typeof id != "string")
                reject("ID must be a string");
            if (!stats.guildCount)
                reject("Must provide a guildCount");
            if (typeof stats.guildCount != "number")
                reject("guildCount must be a number");
            if (stats.shardID) {
                if (typeof stats.shardID != "number")
                    reject("shardID must be a number");
            }
            if (stats.shardCount) {
                if (typeof stats.shardCount != "number")
                    reject("shardCount must be a number");
            }
            request_1.default({
                method: "POST",
                url: `${this.m_base}/bots/${id}/stats`,
                headers: {
                    Authorization: this.m_token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stats),
            }, function (error, response) {
                if (error)
                    reject(error);
                resolve(response.body);
            });
        });
    }
    /**
     * Fetch a bot by client id
     * @param id Client id of the bot to fetch
     * @param options Fetch options
     */
    getBot(id, options = { sanitizeDescription: true }) {
        return new Promise((resolve, reject) => {
            // Type safety
            if (typeof id != "string")
                reject("ID must be a string");
            request_1.default({
                method: "GET",
                url: `${this.m_base}/bots/${id}`,
                headers: {},
                body: JSON.stringify(options),
            }, function (error, response) {
                if (error)
                    reject(error);
                resolve(response.body);
            });
        });
    }
}
exports.default = DiscordBotsGG_API;
