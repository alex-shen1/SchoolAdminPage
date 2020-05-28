const testingData = {
    admins: [{
      name: "Admin Name",
      id: "CDZaxVJThgTf3mEMJMjuyP8IVeW2" // admin@admin.com
    }], //
    teachers: [{
      name: "Teacher Name",
      class: "Class 100",
      id: "tz9ehdvIDmRIF2IDHpv3XcMrznw2" // just teacher@teacher.com
    },
    {
      name: "Teacher Name2",
      class: "Class 200",
      id: "mZoHc5O4DTdFTMBo1Ax31Bq8PRv2" // teacher2@teacher.com
    }],
    students: [
      {
        firstName: "Some",
        lastName: "Guy",
        class: "Class 200",
        GPA: 4,
        grade: 1
      }
    ],
  }

  export const fieldFormatter = {
    firstName: "First Name",
    lastName: "Last Name",
    class: "Class",
    grade: "Grade",
    GPA: "GPA",
  }


  export default testingData;