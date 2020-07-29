import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { StudentEntity } from "src/entities/student.entity";
import { ClassStudentEntity } from "src/entities/class.entity";


@Module({
    imports: [

    ],
    controllers: [StudentController],
    providers: [StudentService, {
        provide: 'STUDENT_REPOSITORY',
        useValue: StudentEntity
    },{
        provide: 'CLASS_REPOSITORY',
        useValue: ClassStudentEntity
    }],
    exports: [StudentService]
})
export class StudentModule {

}