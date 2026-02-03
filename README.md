# Elementary & Secondary Education Report Card API

A RESTful API for managing student records, grades, attendance, and report cards for the Philippine K-12 education system.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize

## Getting Started

```bash
# Install dependencies
npm install

# Configure database
# Edit .env file with your MySQL credentials

# Run development server
npm run dev

# Run production server
npm start
```

## Environment Variables

Create a `.env` file:
```
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=elementary_report_card_db
DB_HOST=127.0.0.1
PORT=3000
```

---

## API Endpoints

### Base URL: `http://localhost:3000/api`

---

## 🎓 Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create a student |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| GET | `/students/:id/report-card` | Get full report card |

### Create Student
```http
POST /api/students
Content-Type: application/json

{
  "lrn": "120001090153",
  "firstName": "Jirvy",
  "lastName": "Dela Torre",
  "middleName": "Celis",
  "birthdate": "2004-02-17",
  "sex": "M",
  "age": 17,
  "gradeLevel": 11,
  "section": "NAGA",
  "schoolYear": "2020-2021",
  "educationLevel": "senior_high",
  "track": "Academic",
  "strand": "HUMSS"
}
```

**Education Levels**: `kindergarten`, `elementary`, `junior_high`, `senior_high`

---

## 📊 Grades

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/grades` | Add grade record |
| GET | `/grades/student/:studentId` | Get grades by student |
| PUT | `/grades/:id` | Update grade |

### Add Grade (K-10)
```http
POST /api/grades
Content-Type: application/json

{
  "studentId": 1,
  "subjectName": "Filipino",
  "q1": 85,
  "q2": 87,
  "q3": 82,
  "q4": 88,
  "finalRating": 85,
  "remarks": "Passed"
}
```

### Add Grade (Senior High)
```http
POST /api/grades
Content-Type: application/json

{
  "studentId": 1,
  "subjectName": "Oral Communication",
  "subjectType": "core",
  "semester": "1",
  "q1": 92,
  "q2": 90,
  "semFinalGrade": 91,
  "remarks": "Passed"
}
```

**Subject Types**: `core`, `applied`, `specialized`, `standard`

---

## 📅 Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/attendance` | Add attendance record |
| GET | `/attendance/student/:studentId` | Get attendance by student |
| PUT | `/attendance/:id` | Update attendance |

### Add Attendance
```http
POST /api/attendance
Content-Type: application/json

{
  "studentId": 1,
  "month": "August",
  "daysOfSchool": 20,
  "daysPresent": 18,
  "daysAbsent": 2,
  "timesTardy": 1
}
```

---

## 🌟 Observed Values

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/observed-values` | Add observed value |
| GET | `/observed-values/student/:studentId` | Get values by student |
| PUT | `/observed-values/:id` | Update value |

### Add Observed Value
```http
POST /api/observed-values
Content-Type: application/json

{
  "studentId": 1,
  "coreValue": "Maka-Diyos",
  "behaviorStatement": "Observes simplicity and modesty",
  "q1": "S",
  "q2": "VS",
  "q3": "VS",
  "q4": "S"
}
```

**Values**: `AO` (Always Observed), `SO` (Sometimes), `RO` (Rarely), `NO` (Not Observed), `S` (Satisfactory), `VS` (Very Satisfactory)

---

## 📚 Subjects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/subjects` | Create subject |
| GET | `/subjects` | Get all subjects |
| GET | `/subjects/:id` | Get subject by ID |
| PUT | `/subjects/:id` | Update subject |
| DELETE | `/subjects/:id` | Delete subject |

### Create Subject
```http
POST /api/subjects
Content-Type: application/json

{
  "name": "Filipino",
  "code": "FIL"
}
```

---

## 🔄 Remedial Classes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/remedial-classes` | Add remedial record |
| GET | `/remedial-classes/student/:studentId` | Get remedials by student |
| PUT | `/remedial-classes/:id` | Update remedial |

### Add Remedial Class
```http
POST /api/remedial-classes
Content-Type: application/json

{
  "studentId": 1,
  "subjectName": "English",
  "finalRating": 70,
  "remedialClassMark": "82",
  "recomputedFinalGrade": 76,
  "remarks": "Passed",
  "conductedFrom": "2024-03-15",
  "conductedTo": "2024-03-30",
  "school": "Benedicto College"
}
```

---

## 🏫 School Records

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/school-records` | Add school record |
| GET | `/school-records/student/:studentId` | Get records by student |
| PUT | `/school-records/:id` | Update record |

### Add School Record
```http
POST /api/school-records
Content-Type: application/json

{
  "studentId": 1,
  "gradeLevel": 7,
  "schoolName": "Sacred Heart Academy",
  "schoolId": "404257",
  "district": "Loon South",
  "division": "Bohol",
  "region": "VII",
  "schoolYear": "2020-2021",
  "adviser": "Vince Nico Anquiero",
  "generalAverage": 88,
  "actionTaken": "Promoted"
}
```

---

## 👤 Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/accounts` | Create account |
| GET | `/accounts` | Get all accounts |
| GET | `/accounts/:id` | Get account by ID |
| PUT | `/accounts/:id` | Update account |
| DELETE | `/accounts/:id` | Delete account |

### Create Account
```http
POST /api/accounts
Content-Type: application/json

{
  "username": "teacher01",
  "email": "teacher01@school.com",
  "password": "Teacher@123",
  "role": "teacher"
}
```

**Roles**: `superadmin`, `admin`, `teacher`, `user`

### Default Superadmin Account
| Field | Value |
|-------|-------|
| Username | `superadmin` |
| Email | `superadmin@school.com` |
| Password | `SuperAdmin@123` |

> **Note**: Run the seeder to create the superadmin account:
> ```bash
> npx sequelize-cli db:seed --seed 20260203-superadmin.js
> ```

---

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

---

## License

MIT
