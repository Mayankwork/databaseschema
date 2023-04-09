import mongoose from "mongoose";

function getRandomDate() {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
}

const WorksnapsTimeEntrySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  timeEntries: {
    type: Object,
  },
});

const WorksnapsTimeEntry = mongoose.model(
  "WorksnapsTimeEntry",
  WorksnapsTimeEntrySchema
);

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: "",
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
  },
  displayName: {
    type: String,
    trim: true,
  },
  municipality: {
    type: String,
  },
});

const Student = mongoose.model("Student", StudentSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const studentsData = [
      {
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        municipality: "New York",
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        displayName: "Jane Doe",
        municipality: "Los Angeles",
      },
      {
        firstName: "Michael",
        lastName: "Smith",
        displayName: "Michael Smith",
        municipality: "Chicago",
      },
      {
        firstName: "Emily",
        lastName: "Johnson",
        displayName: "Emily Johnson",
        municipality: "San Francisco",
      },
      {
        firstName: "Daniel",
        lastName: "Brown",
        displayName: "Daniel Brown",
        municipality: "Seattle",
      },
    ];

    Student.insertMany(studentsData)
      .then((students) => {
        console.log("Students saved:", students);

        students.forEach((student) => {
          const newTimeEntry = new WorksnapsTimeEntry({
            student: student._id,
            timeEntries: { entry1: getRandomDate(), entry2: getRandomDate() },
          });

          newTimeEntry
            .save()
            .then((timeEntry) => {
              console.log(
                `Time entries for Student ${student.firstName} ${student.lastName}:`,
                timeEntry
              );
            })
            .catch((err) => {
              console.error(
                `Failed to save time entry for Student ${student.firstName} ${student.lastName}:`,
                err
              );
            });
        });
      })
      .catch((err) => {
        console.error("Failed to save students:", err);
      });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
