import mongoose from 'mongoose';
import { SERVER_CONFIG } from "server/utils/config";
import { DB_OPTIONS } from "server/utils/db";

export class BaseService {
    private connected: boolean;

    constructor() {
        console.log("Init BaseService");

        this.connected = false;
    }

    protected async Connect(): Promise<void> {
        if (!this.connected) {
            await mongoose.connect(SERVER_CONFIG.DB_CONNECTIONSTRING, DB_OPTIONS);
            this.connected = true;
        }
    }
}