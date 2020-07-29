import { Controller, Get, Post, Body, Delete, Param, Put, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBearerAuth, } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { StudentDTO } from "./dto/student.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { StudentUpdateDTO } from "./dto/student-update.dto";
import { PaginitionModel } from "src/shared/models/paginition-model";
import { QueryStudentInput } from "./dto/query-student.input";

@ApiTags('student')
@Controller('student')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StudentController {
    constructor(
        private studentService: StudentService
    ) { }

    @Get()
    getAllUser(@Query() queryStudentDto: QueryStudentInput) {
        return this.studentService.getAll(queryStudentDto);
    }

    @Get('GetById/:id')
    showUserById(@Param('id') id: number) {
        return this.studentService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'Create new user success !.' })
    // @ApiBody({ type: [StudentEntity] })
    createUser(@Body(new ValidationPipe()) data: StudentDTO) {
        // data.classId = id;
        return this.studentService.create(data);
    }

    @Delete(':id')
    async destroyUser(@Param('id') id: number) {
        return this.studentService.destroy(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Query('id-class') idClass: number, @Body() data: StudentUpdateDTO) {
        // data.classId = idClass;
        return this.studentService.update(id, data, idClass);
    }

}