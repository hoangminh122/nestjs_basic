import { Controller, Get, Post, ValidationPipe, Body, Delete, Param, Put,UseGuards, UseFilters} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { ClassService } from "./class.service";
import { ClassDTO } from "./dto/class.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { DispatchError } from "../../shared/filters/dispatch-error";

@ApiTags('class')
@Controller('class')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
// @UseFilters(new DispatchError())
export class ClassController {
    constructor(
        private classService: ClassService
    ){ }
    @Get()
    showAllUser(){
        return this.classService.showAll();
    }

    @Get('GetById/:id')
    showUserById(@Param('id') id:string){
        return this.classService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Create new user success !.'})
    // @ApiBody({ type: [ClassStudentEntity] })
    createUser(@Body(new ValidationPipe()) data: ClassDTO){
        return this.classService.create(data);
    }

    @Delete(':id')
    async destroyUser(@Param('id') id: string){
        return this.classService.destroy(id);
    }

    @Put(':id')
    updateUser(@Param('id') id:string,@Body() data :ClassDTO){
        return this.classService.update(id,data);
    }

}