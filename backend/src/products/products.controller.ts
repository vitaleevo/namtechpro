import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async findAll() {
        return await this.productsService.findAll();
    }

    @Get('filter')
    async findByCategory(@Query('category') category: string) {
        return await this.productsService.findByCategory(category);
    }
}
