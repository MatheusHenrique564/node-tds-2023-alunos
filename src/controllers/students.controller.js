import { StudentsRepository } from "../models/students/StudentsRepository.js";
import { Student } from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
    const students = await studentsRepository.getStudents();

    if (students.length) {
      return res.status(200).send(students);
    }
    return res.status(404).send({ message: "Não há estudantes cadastrados" });
  }
  catch (error) {
    console.error('Falid to get all students ', error);
    return res.status(500).send({ message: "Erro ao buscar estudantes", error: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getStudentById(id);

    if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

    return res.send(student);
  } catch (error) {
    console.error('Falid to get student by id ', id, error);
    return res.status(500).send({ message: "Erro ao buscar estudante", error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, age, email, code, grade } = req.body;

    const StudentAlreadyExists = await studentsRepository.getStudentByCode(code);

    if (StudentAlreadyExists) {
      return res.status(409).send({ message: "Estudante já cadastrado" });
    }



    const student = new Student(name, age, email, code, grade);

    await studentsRepository.addStudent(student);

    return res.status(201).send(student);
  } catch (error) {
    console.error('Falid to create student ', error);
    return res.status(500).send({ message: "Erro ao criar estudante", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, code, grade } = req.body;



    const StudentAlreadyExists = await studentsRepository.getStudentByCode(code);

    if (StudentAlreadyExists) {
      return res.status(409).send({ message: "Estudante já cadastrado" });
    }

    


    const student = await studentsRepository.getStudentById(id);

    if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

    await studentsRepository.updateStudent(id, name, age, email, code, grade);

    return res.send(student);
  } catch (error) {
    console.error('Falid to update student ', error);
    return res.status(500).send({ message: "Erro ao atualizar estudante", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = studentsRepository.getStudentById(id);

    if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

    await studentsRepository.deleteStudent(id);

    return res.send(student);
  } catch (error) {
    console.error('Falid to delete student ', error);
    return res.status(500).send({ message: "Erro ao deletar estudante", error: error.message });
  }
};
