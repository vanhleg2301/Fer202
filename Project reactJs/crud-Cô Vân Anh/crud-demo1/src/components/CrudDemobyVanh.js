// import { ListStudents } from '../components/data/students';\
import { data } from '../components/data/studentsByVanh';
import React, { useState, useEffect, useRef } from 'react';

const CrudDemo = () => {
    const init = {
        name: '',
        date: 'showDate',
        gender: 'male',
        score: '',
        Action: '',
    }
    const [students, setStudents] = useState(data);
    const [update, setUpdate] = useState(false);
    const [info, setInfo] = useState(init);
    const studentsCurent = useRef(null);


    const handleInfo = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    // Hàm hiển thị date 
    const showDate = (date) => {

    }

    useEffect(() => {
        setUpdate(false)
        studentsCurent.current = students
    }, []);

    //Hàm xử lý Xóa 1 sinh viên
    const deleteStudent = (name) => {
        const confirmDelete = prompt('Bạn muốn xóa sản phẩm có name là '
            + name + '?', 'ok')
        if (confirmDelete) {
            const newStudents = students.filter(student =>
                student.name.toString() !== name.toString());
            setStudents(newStudents);
            studentsCurent.current = newStudents;
        }

    }

    // Hàm xử lý thêm 
    const addStudent = (student) => {
        const newStudents = [...students]
        newStudents.push(student)
        setStudents(newStudents)
        studentsCurent.current = newStudents;
    }
    const handleSaveStudent = () => {
        const student = {
            name: info.name,
            date: info.date,
            gender: info.gender,
            score: info.score,

        }
        if (info.name == "" || info.score == "") {
            alert('Vui lòng nhập hết các ô bên dưới');
        }
        else {
            setInfo(init);
            addStudent(student);
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

    // sắp xếp theo DOB
    const handleSortDOBStudent = () => {

    }

    // sắp xếp theo score 
    const handleSortAgeStudent = () => {
        const newStudents = [...students].sort((studentA,
            studentB) => {
            return studentA.score - studentB.score;
        })
        setStudents(newStudents);
    }

    //return
    return (
        <div className="content">
            <div className="title">
                <h1>
                    List of student
                    (<span>{students.length}</span>)
                </h1>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of birth</th>
                        <th>Gender</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr
                            onClick={(e) => {
                                if (e.target.textContent !== 'Delete') {
                                    setInfo({
                                        name: student.name,
                                        date: student.date,
                                        genderValue: student.gender,
                                        score: student.score,
                                        
                                    })
                                    setUpdate(true)
                                }
                            }}
                            key={student.name}
                        
                        >
                            <td>{student.name}</td>
                            <td>{student.date}</td>
                            <td>{student.gender}</td>
                            <td>{student.score}</td>
                            <td>
                                <button
                                    style={{
                                        backgroundColor: '#dc3545',
                                        width: "100%",
                                        height: "30px",
                                        padding: "8px"
                                    }}
                                    onClick={() => deleteStudent(`${student.name}`)}
                                    className="buttonDelete"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="info">
                <div className="field">
                    <input
                        value={info.name}
                        onChange={handleInfo}
                        name='name'
                        id="studentName" type="text"
                        placeholder="Enter Name" />
                </div>

                <div className="field">
                    <input
                        value={info.date}
                        onChange={handleSortDOBStudent}
                        name='date'
                        id="studentDate" type="date"
                        placeholder="Enter date" />
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
                <div className="field">
                    <input
                        value={info.score}
                        onChange={handleInfo}
                        name='score'
                        id="studentScore" type="number"
                        placeholder="Enter score" />
                </div>
            </div>

            <div className="btn">
                <button
                    onClick={handleSaveStudent}
                    style={{
                        backgroundColor: '#007bff'
                    }} className="btn-save">Save</button>
                <button
                    onClick={handleSortStudent}
                    style={{
                        backgroundColor: 'yellow'
                    }} className="btn-sort">Sort by name</button>
                <button
                    onClick={handleSortDOBStudent}
                    style={{
                        backgroundColor: 'red'
                    }} className="btn-sort">Sort by DOB</button>
                <button
                    onClick={handleSortAgeStudent}
                    style={{
                        backgroundColor: 'orange'
                    }} className="btn-sort">Sort by age</button>
            </div>

        </div>
    );

}
export default CrudDemo;