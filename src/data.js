const testingData = {
  admins: [{
    name: "Mister Admin",
    id: "CDZaxVJThgTf3mEMJMjuyP8IVeW2" // admin@admin.com
  }], //
  teachers: [{
    name: "Mister Teacher",
    class: "Class 100",
    id: "tz9ehdvIDmRIF2IDHpv3XcMrznw2" // just teacher@teacher.com
  },
  {
    name: "Miss Teacher",
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

export const fieldFormatter = {
  firstName: "First Name",
  lastName: "Last Name",
  name: "Name",
  class: "Class",
  grade: "Grade",
  GPA: "GPA",
}

export function formatStudentData(student) {
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


export default testingData;