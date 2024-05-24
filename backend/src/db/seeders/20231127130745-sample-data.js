const db = require('../models');
const Users = db.users;

const Courses = db.courses;

const DiscussionBoards = db.discussion_boards;

const Enrollments = db.enrollments;

const LiveSessions = db.live_sessions;

const CoursesData = [
  {
    title: 'Introduction to Programming',

    description: 'Learn the basics of programming.',

    // type code here for "relation_many" field

    start_date: new Date('2023-01-10T09:00:00Z'),

    end_date: new Date('2023-06-10T17:00:00Z'),

    // type code here for "files" field
  },

  {
    title: 'Advanced Mathematics',

    description: 'Dive deep into advanced mathematical concepts.',

    // type code here for "relation_many" field

    start_date: new Date('2023-02-15T09:00:00Z'),

    end_date: new Date('2023-07-15T17:00:00Z'),

    // type code here for "files" field
  },

  {
    title: 'Web Development',

    description: 'Become a web developer from scratch.',

    // type code here for "relation_many" field

    start_date: new Date('2023-03-20T09:00:00Z'),

    end_date: new Date('2023-08-20T17:00:00Z'),

    // type code here for "files" field
  },

  {
    title: 'Graphic Design for Beginners',

    description: 'Learn the fundamentals of graphic design.',

    // type code here for "relation_many" field

    start_date: new Date('2023-04-25T09:00:00Z'),

    end_date: new Date('2023-09-25T17:00:00Z'),

    // type code here for "files" field
  },

  {
    title: 'Data Science and Analytics',

    description: 'Unlock the power of data.',

    // type code here for "relation_many" field

    start_date: new Date('2023-05-30T09:00:00Z'),

    end_date: new Date('2023-10-30T17:00:00Z'),

    // type code here for "files" field
  },
];

const DiscussionBoardsData = [
  {
    // type code here for "relation_one" field

    topic: 'Week 1 Discussion',

    description: 'Discuss the basics of programming learned in week 1.',
  },

  {
    // type code here for "relation_one" field

    topic: 'Algebraic Theories',

    description: 'Deep dive into algebraic theories and applications.',
  },

  {
    // type code here for "relation_one" field

    topic: 'HTML & CSS Basics',

    description: 'Discuss and share resources on HTML & CSS.',
  },

  {
    // type code here for "relation_one" field

    topic: 'Design Principles',

    description: 'Discuss the fundamental principles of design.',
  },

  {
    // type code here for "relation_one" field

    topic: 'Data Visualization Tools',

    description: 'Share and discuss the best tools for data visualization.',
  },
];

const EnrollmentsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    enrolled_at: new Date('2023-01-05T12:00:00Z'),

    payment_status: 'paid',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    enrolled_at: new Date('2023-02-10T12:00:00Z'),

    payment_status: 'pending',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    enrolled_at: new Date('2023-03-15T12:00:00Z'),

    payment_status: 'paid',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    enrolled_at: new Date('2023-04-20T12:00:00Z'),

    payment_status: 'cancelled',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    enrolled_at: new Date('2023-05-25T12:00:00Z'),

    payment_status: 'paid',
  },
];

const LiveSessionsData = [
  {
    // type code here for "relation_one" field

    scheduled_time: new Date('2023-01-12T15:00:00Z'),

    platform: 'Google Meet',

    link: 'https://meet.google.com/example-meet',
  },

  {
    // type code here for "relation_one" field

    scheduled_time: new Date('2023-02-17T15:00:00Z'),

    platform: 'Zoom',

    link: 'https://zoom.us/j/123456789',
  },

  {
    // type code here for "relation_one" field

    scheduled_time: new Date('2023-03-22T15:00:00Z'),

    platform: 'Google Meet',

    link: 'https://meet.google.com/example-meet-web',
  },

  {
    // type code here for "relation_one" field

    scheduled_time: new Date('2023-04-27T15:00:00Z'),

    platform: 'Zoom',

    link: 'https://zoom.us/j/987654321',
  },

  {
    // type code here for "relation_one" field

    scheduled_time: new Date('2023-05-31T15:00:00Z'),

    platform: 'Google Meet',

    link: 'https://meet.google.com/example-meet-data',
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateDiscussionBoardWithCourse() {
  const relatedCourse0 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const DiscussionBoard0 = await DiscussionBoards.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DiscussionBoard0?.setCourse) {
    await DiscussionBoard0.setCourse(relatedCourse0);
  }

  const relatedCourse1 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const DiscussionBoard1 = await DiscussionBoards.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DiscussionBoard1?.setCourse) {
    await DiscussionBoard1.setCourse(relatedCourse1);
  }

  const relatedCourse2 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const DiscussionBoard2 = await DiscussionBoards.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DiscussionBoard2?.setCourse) {
    await DiscussionBoard2.setCourse(relatedCourse2);
  }

  const relatedCourse3 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const DiscussionBoard3 = await DiscussionBoards.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DiscussionBoard3?.setCourse) {
    await DiscussionBoard3.setCourse(relatedCourse3);
  }

  const relatedCourse4 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const DiscussionBoard4 = await DiscussionBoards.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DiscussionBoard4?.setCourse) {
    await DiscussionBoard4.setCourse(relatedCourse4);
  }
}

async function associateEnrollmentWithStudent() {
  const relatedStudent0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Enrollment0 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Enrollment0?.setStudent) {
    await Enrollment0.setStudent(relatedStudent0);
  }

  const relatedStudent1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Enrollment1 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Enrollment1?.setStudent) {
    await Enrollment1.setStudent(relatedStudent1);
  }

  const relatedStudent2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Enrollment2 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Enrollment2?.setStudent) {
    await Enrollment2.setStudent(relatedStudent2);
  }

  const relatedStudent3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Enrollment3 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Enrollment3?.setStudent) {
    await Enrollment3.setStudent(relatedStudent3);
  }

  const relatedStudent4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Enrollment4 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Enrollment4?.setStudent) {
    await Enrollment4.setStudent(relatedStudent4);
  }
}

async function associateEnrollmentWithCourse() {
  const relatedCourse0 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const Enrollment0 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Enrollment0?.setCourse) {
    await Enrollment0.setCourse(relatedCourse0);
  }

  const relatedCourse1 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const Enrollment1 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Enrollment1?.setCourse) {
    await Enrollment1.setCourse(relatedCourse1);
  }

  const relatedCourse2 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const Enrollment2 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Enrollment2?.setCourse) {
    await Enrollment2.setCourse(relatedCourse2);
  }

  const relatedCourse3 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const Enrollment3 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Enrollment3?.setCourse) {
    await Enrollment3.setCourse(relatedCourse3);
  }

  const relatedCourse4 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const Enrollment4 = await Enrollments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Enrollment4?.setCourse) {
    await Enrollment4.setCourse(relatedCourse4);
  }
}

async function associateLiveSessionWithCourse() {
  const relatedCourse0 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const LiveSession0 = await LiveSessions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LiveSession0?.setCourse) {
    await LiveSession0.setCourse(relatedCourse0);
  }

  const relatedCourse1 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const LiveSession1 = await LiveSessions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LiveSession1?.setCourse) {
    await LiveSession1.setCourse(relatedCourse1);
  }

  const relatedCourse2 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const LiveSession2 = await LiveSessions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LiveSession2?.setCourse) {
    await LiveSession2.setCourse(relatedCourse2);
  }

  const relatedCourse3 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const LiveSession3 = await LiveSessions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LiveSession3?.setCourse) {
    await LiveSession3.setCourse(relatedCourse3);
  }

  const relatedCourse4 = await Courses.findOne({
    offset: Math.floor(Math.random() * (await Courses.count())),
  });
  const LiveSession4 = await LiveSessions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LiveSession4?.setCourse) {
    await LiveSession4.setCourse(relatedCourse4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Courses.bulkCreate(CoursesData);

    await DiscussionBoards.bulkCreate(DiscussionBoardsData);

    await Enrollments.bulkCreate(EnrollmentsData);

    await LiveSessions.bulkCreate(LiveSessionsData);

    await Promise.all([
      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateDiscussionBoardWithCourse(),

      await associateEnrollmentWithStudent(),

      await associateEnrollmentWithCourse(),

      await associateLiveSessionWithCourse(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courses', null, {});

    await queryInterface.bulkDelete('discussion_boards', null, {});

    await queryInterface.bulkDelete('enrollments', null, {});

    await queryInterface.bulkDelete('live_sessions', null, {});
  },
};
