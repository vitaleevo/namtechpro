import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

@Injectable()
export class ProductsService {
    private client: ConvexHttpClient;

    constructor(private configService: ConfigService) {
        const convexUrl = this.configService.get<string>('CONVEX_URL');
        if (!convexUrl) {
            throw new Error('CONVEX_URL is not defined in environment variables');
        }
        this.client = new ConvexHttpClient(convexUrl);
    }

    async findAll() {
        return await this.client.query(api.products.list);
    }

    async findByCategory(category: string) {
        return await this.client.query(api.products.getByCategory, { category });
    }
}
