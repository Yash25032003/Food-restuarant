import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service.js';
import { CreateRestuarantDto } from './dto/create-restaurant.dto.js';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto.js';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { GetUser } from '../auth/decorators/get-user.decorator.js';
import { UserRole } from '../users/user.schema.js';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async create(
    @Body() createRestaurantDto: CreateRestuarantDto,
    @GetUser('userId') userId: string,
  ) {
    return this.restaurantService.create(createRestaurantDto, userId);
  }

  @Get()
  async findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @GetUser() user: { userId: string; role: string },
  ) {
    return this.restaurantService.update(id, updateRestaurantDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async remove(
    @Param('id') id: string,
    @GetUser() user: { userId: string; role: string },
  ) {
    return this.restaurantService.remove(id, user);
  }
}