import pg from "../../database/index.js";

export class StudentsRepository {
  constructor() {
    this.pg = pg;
  }

  async getStudents() {
    try {
      const students = await this.pg.query("SELECT * FROM students");
      console.log(students);
      return students;
    }
    catch (error) {
      console.error('Falid to get all students ', error);
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE id = $1", [id]);
      console.log(student);
      return student;
    }
    catch (error) {
      console.error('Falid to get student by id ', id, error);
      throw error;
        }
  }

  async getStudentByCode(code) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE code = $1", [code]);
      console.log(student);
      return student;
    }
    catch (error) {
      console.error('Falid to get student by code ', code, error);
      throw error;
    }
  }

  async addStudent(student) {
    try {
      await this.pg.none("INSERT INTO students (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)", [student.id, student.name, student.age, student.email, student.code, student.grade]);
    }
    catch (error) {
      console.error('Falid to create student ', error);
      throw error;
    }
  }

  async updateStudent(id, name, age, email, code, grade) {
    try {
      await this.pg.none("UPDATE students SET name = $1, age = $2, email = $3, code = $4, grade = $5 WHERE id = $6", [name, age, email, code, grade, id]);
    }
    catch (error) {
      console.error('Falid to update student ', error);
      throw error;
    }

  }

  async deleteStudent(id) {
    try {
      await this.pg.none("DELETE FROM students WHERE id = $1", [id]);
    }
    catch (error) {
      console.error('Falid to delete student ', error);
      throw error;
    }
  }
}
