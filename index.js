"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("request"));
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
            request.post({
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
                resolve(response === null || response === void 0 ? void 0 : response.body);
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
            request.get({
                method: "GET",
                url: `${this.m_base}/bots/${id}`,
                headers: {},
                body: JSON.stringify(options),
            }, function (error, response) {
                if (error)
                    reject(error);
                resolve(response === null || response === void 0 ? void 0 : response.body);
            });
        });
    }
}
exports.default = DiscordBotsGG_API;
