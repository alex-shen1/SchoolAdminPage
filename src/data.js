const testingData = {
  admins: [{
    firstName: "Mister",
    lastName: "Admin",
    id: "CDZaxVJThgTf3mEMJMjuyP8IVeW2" // admin@admin.com
  }], //
  teachers: [{
    firstName: "Mister",
    lastName: "Teacher",
    class: "Class 100",
    id: "tz9ehdvIDmRIF2IDHpv3XcMrznw2" // just teacher@teacher.com
  },
  {
    firstName: "Miss",
    lastName: "Teacher",
    class: "Class 200",
    id: "mZoHc5O4DTdFTMBo1Ax31Bq8PRv2" // teacher2@teacher.com
  }],
  students: [
    {
      firstName: "Some",
      lastName: "Guy",
      class: "Class 200",
      GPA: 4,
      grade: 1,
      id: 123
    },
    {
      firstName: "Another",
      lastName: "Student",
      class: "Class 100",
      GPA: 3,
      grade: 2,
      id: 456
    }
  ],
}

export const studentFieldFormatter = {
  firstName: "First Name",
  lastName: "Last Name",
  name: "Name",
  class: "Class",
  grade: "Grade",
  GPA: "GPA",
}

export const formatStudentData = (student) => {
  let template = {
    class: "",
    grade: "",
    GPA: ""
  }
  Object.keys(template).map(field => {
    if (field != "name") {
      template[field] = student[field]
    }
  })
  return template;
}

export const teacherFieldFormatter = {
  firstName: "First Name",
  lastName: "Last Name",
  class: "Class"
}

export const formatTeacherData = (teacher) => {
  let template = {
    class: "",
  }
  Object.keys(template).map(field => {
    if (field != "name") {
      template[field] = teacher[field]
    }
  })
  return template;
}


export default testingData;