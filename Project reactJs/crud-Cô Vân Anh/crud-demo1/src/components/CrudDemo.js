import { ListStudents } from '../components/data/students';
import React, { useState, useEffect, useRef } from 'react';

const CrudDemo = () => {
    const init = {
        id: '',
        name: '',
        age: '',
        gender: 'male',
    }
    const [students, setStudents] = useState(ListStudents);
    const [update, setUpdate] = useState(false);
    const [info, setInfo] = useState(init);
    const studentsCurent = useRef(null);


    const handleInfo = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setUpdate(false)
        studentsCurent.current = students
    }, [])

    //tìm 1 sinh viên qua id
    const getStudentById = (id) => {
        for (let i = 0; i < students.length; i++) {
            if (students[i].id.toString() === id.toString()) return students[i]
        }
        return null;
    }
    //Hàm xử lý thêm 1 sinh viên
    const addStudent = (student) => {
        const newStudents = [...students]
        newStudents.push(student)
        setStudents(newStudents)
        studentsCurent.current = newStudents;
    }
    //Hàm xử lý Xóa 1 sinh viên
    const deleteStudent = (id) => {
        const confirmDelete = prompt('Bạn muốn xóa sản phẩm có id là '
            + id + '?', 'ok')
        if (confirmDelete) {
            const newStudents = students.filter(student =>
                student.id.toString() !== id.toString());
            setStudents(newStudents);
            studentsCurent.current = newStudents;
        }

    }
    //Hàm xử lý cập nhật 1 sinh viên
    const updateStudent = (student) => {
        const fineIndex = students.findIndex(studentTmp =>
            studentTmp.id.toString() === student.id.toString());
        const newStudent = [...students];
        newStudent[fineIndex] = student;
        setStudents(newStudent);
        studentsCurent.current = newStudent;
    }

    // Hàm xử lý thêm 
    const handleSaveStudent = () => {
        const student = {
            id: info.id,
            name: info.name,
            age: info.age,
            gender: info.gender
        }
        if (info.id == "" || info.name == "" || info.age == "") {
            alert('Vui lòng nhập hết các ô bên dưới');
        }
        else if (getStudentById(info.id)) {
            alert('ID đã tồn tại, vui lòng chọn ID khác');
        }
        else {
            setInfo(init);
            addStudent(student);
        }
    }

    // xử lý cập nhật 
    const handleUpdateStudent = () => {
        if (update) {
            const student = {
                id: info.id,
                name: info.name,
                age: info.age,
                gender: info.genderValue
            }
            setInfo(init);
            setUpdate(false);
            updateStudent(student);
        }
        else {
            alert('Vui lòng click vào student để thực hiện update');
        }
    }

    //sắp xếp theo tên 
    const handleSortStudent = () => {
        const newStudents = [...students].sort((studentA,
            studentB) => {
            return studentA.name.localeCompare(studentB.name)
        })
        setStudents(newStudents);
    }

    // sắp xếp theo tuổi 
    const handleSortAgeStudent = () => {
        const newStudents = [...students].sort((studentA,
            studentB) => {
            return studentA.age - studentB.age;
        })
        setStudents(newStudents);
    }

    // search
    const handleSearchStudent = () => {
        const search = prompt('Nhập vào tìm kiếm');
        if (search) {
            const searchStudents =
                [...studentsCurent.current].filter(student =>
                    student.name.toLowerCase().includes(search.toLowerCase()))
            setStudents(searchStudents);
        }
    }

    // show all
    const handleShowStudent = () => {
        const allStudents = [...studentsCurent.current];
        setStudents(allStudents);
    }

    //return
    return (
        <div className="content">
            
            <div className="title">
                <h1>
                    List of student
                    (<span>{students.length}</span>)
                </h1>
                <h3>List student</h3>
            </div>

            <div className="info">
                <div className="field">
                    <label>Student id</label>
                    <input
                        readOnly={update}
                        value={info.id}
                        onChange={handleInfo}
                        name='id'
                        id="studentID" type="text"
                        placeholder="Enter ID" />
                </div>
                <div className="field">
                    <label>Student Name</label>
                    <input
                        value={info.name}
                        onChange={handleInfo}
                        name='name'
                        id="studentName" type="text"
                        placeholder="Enter Name" />
                </div>
                <div className="field">
                    <label>Age</label>
                    <input
                        value={info.age}
                        onChange={handleInfo}
                        name='age'
                        id="studentAge" type="number"
                        placeholder="Enter Age" />
                </div>
                <div className="info-gender">
                    <span>Gender:</span>
                    <div className="male-gender">
                        <input
                            value="male"
                            onChange={handleInfo}
                            checked={info.gender === 'male'}
                            type="radio" name="gender"
                            id="male" />
                        <label>Male</label>
                    </div>
                    <div className="female-gender">
                        <input
                            value="female"
                            onChange={handleInfo}
                            checked={info.gender === 'female'}
                            type="radio" name="gender"
                            id="female" />
                        <label>Female</label>
                    </div>
                </div>
            </div>

            <div className="btn">
                <button
                    onClick={handleSaveStudent}
                    style={{
                        backgroundColor: '#007bff'
                    }} className="btn-save">Save</button>
                <button
                    onClick={handleUpdateStudent}
                    style={{
                        backgroundColor: '#6c757d'
                    }} className="btn-update">Update</button>
                <button
                    onClick={handleSortStudent}
                    style={{
                        backgroundColor: '#28a745'
                    }} className="btn-sort">Sort by name</button>
                <button
                    onClick={handleSortAgeStudent}
                    style={{
                        backgroundColor: '#28a745'
                    }} className="btn-sort">Sort by age</button>
                <button onClick={handleSearchStudent}
                    style={{
                        backgroundColor: '#17a2b8'
                    }} className="btn-search">Search</button>
                <button onClick={handleShowStudent}
                    style={{
                        backgroundColor: '#17FF34'
                    }} className="btn-show">Show all</button>

            </div>

            <table className="table-student">
                <thead className="head-student">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Gender</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody className="body-student">
                    {students.map(student => (
                        <tr
                            onClick={(e) => {
                                if (e.target.textContent !==
                                    'Delete') {
                                    setInfo({
                                        id: student.id,
                                        name: student.name,
                                        age: student.age,
                                        genderValue:
                                            student.gender,
                                    })
                                    setUpdate(true)
                                }
                            }}
                            key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>
                                <button
                                    style={{
                                        backgroundColor: '#dc3545'
                                    }}
                                    onClick={() =>
                                        deleteStudent(`${student.id}`)}
                                    className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

}

export default CrudDemo;